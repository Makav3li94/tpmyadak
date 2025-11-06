<?php

namespace App\Console\Commands;

use App\Models\Shop\Brand;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\Product;
use App\Models\Shop\ProductCategory;
use App\Models\Shop\ProductSpecs;
use Illuminate\Console\Command;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;
use Symfony\Component\DomCrawler\Crawler;

class ScrapeProducts extends Command
{
    protected $signature = 'scrape:products {limit=50}';

    protected $description = 'Scrape products from MrYadaki (test mode)';

    public function handle()
    {
        $sitemaps = [
            'https://www.mryadaki.com/sitemap-products-1.xml',
            'https://www.mryadaki.com/sitemap-products-2.xml',
        ];

        $links = [];
        foreach ($sitemaps as $url) {
            $xml = Http::get($url)->body();
            preg_match_all('/<loc>(.*?)<\/loc>/', $xml, $m);
            $links = array_merge($links, $m[1]);
        }

        $links = array_slice($links, 0, $this->argument('limit'));

        foreach ($links as $url) {
            $this->line("\n🔍 محصول: $url");

            $html = Http::get($url)->body();
            $dom = new Crawler($html);

            $getText = fn (Crawler $crawler, string $selector): ?string => $crawler->filter($selector)->count() ? trim($crawler->filter($selector)->first()->text()) : null;

            // Title
            $title = $getText($dom, 'h1') ?? 'بدون عنوان';

            // حذف بخش "مناسب ..." از عنوان
            $baseTitle = preg_replace('/\s*مناسب\s.+$/u', '', $title);
            $slug = Str::slug($baseTitle);

            // تولید برند
            $producerBrandName = $getText($dom, 'li:contains("شرکت سازنده") > div:nth-child(2) div');
            $producerBrand = $producerBrandName ? findSimilarRecord(Brand::class, $producerBrandName) : null;
            if (! $producerBrand) {
                $producerBrand = Brand::firstOrCreate(
                    ['slug' => 'tpm'],
                    ['title' => 'TPM', 'alias' => 'TPM', 'status' => 1]
                );
            }
            $brandId = $producerBrand->id;

            // دسته‌بندی
            $catName = $getText($dom, 'li:contains("دسته بندی") div[data-checkbox]');
            $category = $catName ? findSimilarRecord(ProductCategory::class, $catName) : null;
            if (! $category) {
                $this->error("⛔ دسته یافت نشد → $catName");

                continue;
            }

            // قیمت
            $priceText = $getText($dom, 'span.font-bold');
            $price = $priceText ? intval(str_replace([',', ' '], '', $priceText)) : 0;
            if (! $price) {
                $this->error("⛔ قیمت یافت نشد → $price");

                continue;
            }

            // برند خودرو
            $carBrandName = $getText($dom, 'li:contains("برند خودرو") div[data-checkbox]');
            $carBrand = $carBrandName ? findSimilarRecord(CarBrand::class, $carBrandName) : null;
            if (! $carBrand) {
                $carBrand = CarBrand::firstOrCreate(
                    ['slug' => 'all'],
                    ['title' => 'all', 'alias' => 'all', 'status' => 1]
                );
            }

            // بررسی محصول مشابه
            $existingProduct = Product::where('slug', $slug)->first();

            // Car Models
            $carModelsToAttach = [];
            $carTrims = $getText($dom, 'li:contains("تیپ خودرو") div.col-span-2');
            $carType = $getText($dom, 'li:contains("نوع خودرو") div[data-checkbox]');
            $carList = [];
            if ($carType) {
                $carList[] = $carType;
            }
            if ($carTrims) {
                $carList = array_merge($carList, preg_split('/،|,/', $carTrims));
            }

            foreach ($carList as $trimName) {
                $trimName = trim($trimName);
                if (! $trimName) {
                    continue;
                }
                $model = findSimilarRecord(CarModel::class, $trimName, ['car_brand_id' => $carBrand->id]);
                $carModelsToAttach[] = $model->id;
            }

            if ($existingProduct) {
                // فقط اضافه کردن CarModels
                if ($carModelsToAttach) {
                    $existingProduct->carModels()->syncWithoutDetaching($carModelsToAttach);
                    $this->line('ℹ️ محصول مشابه یافت شد → مدل‌های خودرو اضافه شدند: '.implode(', ', $carModelsToAttach));
                }
                $product = $existingProduct;
            } else {
                // ایجاد محصول جدید
                $sku = 'tpm-'.rand(100000, 999999);
                $product = Product::create([
                    'title' => $baseTitle,
                    'slug' => $slug,
                    'alias' => $baseTitle,
                    'product_category_id' => $category->id,
                    'brand_id' => $brandId,
                    'supplier_id' => '01k86an50vsawm8cjhdhs37thj',
                    'tax_id' => '01k86an54q3xzaf0njwx36bae4',
                    'sku' => $sku,
                    'upc' => $sku,
                    'ean' => $sku,
                    'jan' => $sku,
                    'isbn' => $sku,
                    'mpn' => $sku,
                    'price' => $price,
                    'stock' => 1,
                    'minimum' => 1,
                    'status_promotion' => 0,
                ]);

                if ($carModelsToAttach) {
                    $product->carModels()->sync($carModelsToAttach);
                    $this->line('🚗 مدل‌های خودرو متصل شد: '.implode(', ', $carModelsToAttach));
                }
            }

            // Specs → حذف فیلدهای مربوط به مدل خودرو
            $dom->filter('div[data-show-max] ul li')->each(function ($li) use ($product, $getText) {
                $titleSpec = $getText($li, 'div.col-span-1');
                $value = $getText($li, 'div.col-span-2 div');
                if (! $titleSpec || ! $value) {
                    return;
                }

                if (in_array($titleSpec, ['نوع خودرو', 'تیپ خودرو'])) {
                    return;
                }

                $category = $product->category;
                if (! $category) {
                    return;
                }

                $filter = $category->filters()->where('title', $titleSpec)->first();
                if ($filter) {
                    $product->filters()->syncWithoutDetaching([$filter->id => ['value' => $value]]);
                } else {
                    // فقط محصول جدید → Specs
                    if (! $product->exists) {
                        return;
                    }
                    ProductSpecs::create([
                        'product_id' => $product->id,
                        'title' => $titleSpec,
                        'value' => $value,
                    ]);
                }
            });

            // Images → فقط برای محصول جدید
            if (! $existingProduct) {
                $imgs = $dom->filter('.product-gallery-mobile-swiper img')->each(fn ($img) => $img->attr('src'));
                $imgs = array_unique($imgs);
                $downloaded = [];
                $manager = new ImageManager(new Driver);

                foreach ($imgs as $imgUrl) {
                    if (! str_contains($imgUrl, 'cdn.mryadaki.com')) {
                        continue;
                    }
                    try {
                        $response = Http::timeout(20)->get($imgUrl);
                        if (! $response->ok() || empty($response->body())) {
                            continue;
                        }

                        $image = $manager->read($response->body());
                        $wmW = (int) ($image->width() * 0.18);
                        $wmH = (int) ($image->height() * 0.21);
                        $whitePatch = $manager->create($wmW, $wmH);
                        $whitePatch->fill('#ffffff');
                        $image->place($whitePatch, 'top-left', 0, 0, 100);

                        $tmpFinal = storage_path('app/temp/'.Str::random().'.webp');
                        $image->encode(new WebpEncoder(quality: 70))->save($tmpFinal);

                        $downloaded[] = new UploadedFile($tmpFinal, basename($tmpFinal), 'image/webp', null, true);
                    } catch (\Throwable $e) {
                        $this->warn("⚠️ خطا در دانلود یا پردازش تصویر: {$imgUrl} - {$e->getMessage()}");

                        continue;
                    }
                }

                if ($downloaded) {
                    request()->replace(['images' => $downloaded]);
                    app('App\Http\Controllers\Admin\ProductController')->handleImages(request(), $product);
                }
            }

            $this->info("✅ ذخیره شد: $baseTitle");
        }

        $this->info("\n🎉 تمام شد");
    }
}
