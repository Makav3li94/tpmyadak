<?php

namespace App\Console\Commands;

use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\Product;
use App\Models\Shop\ProductCategory;
use App\Models\Shop\ProductSpecs;
use Illuminate\Console\Command;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use Symfony\Component\DomCrawler\Crawler;

class ScrapeProducts extends Command
{
    protected $signature = 'scrape:products {limit=3}';

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

            // تابع کمکی برای گرفتن متن امن
            $getText = fn (Crawler $crawler, string $selector): ?string => $crawler->filter($selector)->count() ? trim($crawler->filter($selector)->first()->text()) : null;

            // Title
            $title = $getText($dom, 'h1') ?? 'بدون عنوان';

            $producerBrandName = null;
            $producerNode = $dom->filter('div:contains("برند تولید کننده")')->filter('a');

            if ($producerNode->count()) {
                $producerBrandName = trim($producerNode->text());
            }

            // تلاش برای یافتن برند مشابه
            $producerBrand = null;
            if ($producerBrandName) {
                $producerBrand = findSimilarRecord(\App\Models\Shop\Brand::class, $producerBrandName);
            }

            // اگر پیدا نشد => fallback به TPM (ساخت اگر وجود ندارد)
            if (! $producerBrand) {
                $producerBrand = \App\Models\Shop\Brand::firstOrCreate(
                    ['slug' => 'tpm'],
                    [
                        'title' => 'TPM',
                        'alias' => 'TPM',
                        'status' => 1,
                    ]
                );
            }

            // حالا همیشه برند وجود دارد → ID امن
            $brandId = $producerBrand->id;

            // Category
            $catName = $getText($dom, 'li:contains("دسته بندی") div[data-checkbox]');
            $category = $catName ? findSimilarRecord(ProductCategory::class, $catName) : null;

            if (! $category) {
                $this->error("⛔ دسته یافت نشد → $catName");

                continue;
            } else {
                $this->line("\n🔍 category: $category->title");
            }

            // Price
            $priceText = $getText($dom, 'span.font-bold');
            $price = $priceText ? intval(str_replace([',', ' '], '', $priceText)) : 0;

            if (! $price) {
                $this->error("⛔ قیمت یافت نشد → $price");

                continue;
            } else {
                $this->line("\n🔍 price: $price");
            }
            // Car Brand
            $carBrandName = $getText($dom, 'li:contains("برند خودرو") div[data-checkbox]');
            $carBrand = $carBrandName ? findSimilarRecord(CarBrand::class, $carBrandName) : null;
            if (! $carBrand) {
                $this->error("⛔ برند خودرو یافت نشد → $carBrand");

                continue;
            } else {
                $this->line("\n🔍 carBrand: $carBrand->title");
            }
            // Car Model

            // تیپ خودرو → مدل‌ها
            $carTrims = $getText($dom, 'li:contains("تیپ خودرو") div.col-span-2');
            $carModelsToAttach = [];

            if ($carTrims && $carBrand) {

                // جدا کردن موارد با کاما فارسی/انگلیسی
                $trimList = preg_split('/،|,/', $carTrims);

                foreach ($trimList as $trimName) {
                    $trimName = trim($trimName);
                    if (! $trimName) {
                        continue;
                    }

                    // پیدا کردن یا ساخت مدل خودرو
                    $model = findSimilarRecord(CarModel::class, $trimName, [
                        'car_brand_id' => $carBrand->id,
                    ]);

                    $carModelsToAttach[] = $model->id;
                }
            }

            $carModelsToAttach = array_unique($carModelsToAttach);

            if (empty($carModelsToAttach)) {
                $this->error("⛔ هیچ مدل خودرویی از «تیپ خودرو» یافت نشد → $title");

                continue;
            }

            // Create product
            $sku = 'tpm-'.rand(100000, 999999);
            $product = Product::create([
                'title' => $title,
                'alias' => $title,
                'slug' => Str::slug($title),
                'product_category_id' => $category->id,
                //                'car_brand_id' => $carBrand->id ?? null,
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
                $this->line('🚗 مدل‌های متصل شده: '.implode(', ', $carModelsToAttach));
            }

            // Specs
            $dom->filter('#specs li')->each(function ($li) use ($product, $getText) {
                $title = $getText($li, '.text-text\/60');
                $value = $getText($li, '.col-span-2, .lg\:col-span-4');

                if (! $title || in_array($title, ['برند خودرو', 'نوع خودرو', 'دسته بندی'])) {
                    return;
                }

                ProductSpecs::create([
                    'id' => Str::ulid(),
                    'product_id' => $product->id,
                    'title' => $title,
                    'value' => $value,
                ]);
            });

            // Images
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

                    // ایجاد تصویر و resize
                    $image = $manager->read($response->body())->resize(350, 350);

                    // ایجاد patch سفید بالای سمت چپ
                    $wmW = (int) ($image->width() * 0.18);
                    $wmH = (int) ($image->height() * 0.21);
                    $whitePatch = $manager->create($wmW, $wmH);
                    $whitePatch->fill('#ffffff');

                    $image->place($whitePatch, 'top-left', 0, 0, 100);

                    // ذخیره تصویر موقت WebP
                    $tmpFinal = storage_path('app/temp/'.Str::random().'.webp');
                    $image->encode(new WebpEncoder(quality: 70))->save($tmpFinal);

                    // تبدیل به UploadedFile
                    $downloaded[] = new UploadedFile($tmpFinal, basename($tmpFinal), 'image/webp', null, true);

                } catch (\Throwable $e) {
                    $this->warn("⚠️ خطا در دانلود یا پردازش تصویر: {$imgUrl} - {$e->getMessage()}");

                    continue;
                }
            }

            // اگر تصویر دانلود شد، به request اضافه کن و پردازش کن
            if ($downloaded) {
                request()->replace(['images' => $downloaded]);
                app('App\Http\Controllers\Admin\ProductController')->handleImages(request(), $product);
            }

            $this->info("✅ ذخیره شد: $title");
        }

        $this->info("\n🎉 تمام شد");
    }
}
