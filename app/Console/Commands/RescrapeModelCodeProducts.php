<?php

namespace App\Console\Commands;

use App\Models\Shop\ProductSpecs;
use App\Models\ScrapedProduct;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\Product;
use App\Models\Shop\ProductImage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;

class RescrapeModelCodeProducts extends Command
{
    protected $signature = 'scraper:rescrape-modelcode';
    protected $description = 'Rescrape and split model_code products correctly';

    public function handle(): void
    {
        $this->info('🚀 شروع عملیات...');

        $scrapedProducts = ScrapedProduct::whereNotNull('model_code')->get();
        foreach ($scrapedProducts as $scraped) {

            DB::beginTransaction();

            try {

                $this->line("🔄 Processing: {$scraped->url}");

                $oldProduct = Product::where('model_code', $scraped->model_code)->first();

                if (! $oldProduct) {
                    $this->warn("Template یافت نشد برای {$scraped->model_code}");
                    continue;
                }

                $response = Http::timeout(60)->get($scraped->url);

                if (! $response->successful()) {
                    $this->error("❌ خطا در دریافت لینک");
                    continue;
                }

                $crawler = new Crawler($response->body());

                // helper مشابه اسکرپر اصلیت
                $getText = function ($crawler, $selector) {
                    try {
                        return $crawler->filter($selector)->count()
                            ? trim($crawler->filter($selector)->first()->text())
                            : null;
                    } catch (\Exception $e) {
                        return null;
                    }
                };

                // ---------- TITLE ----------
                $title = $getText($crawler, 'h1');
                if (! $title) {
                    $this->warn('⚠️ عنوان یافت نشد');
                    continue;
                }

                // ---------- PRICE ----------
                $priceText = $getText($crawler, 'span.font-bold');
                $price = $priceText ? intval(preg_replace('/[^0-9]/', '', $priceText)) : 0;
                $stockValue = $price > 0 ? 1 : 0;

                if ($price == 0) {
                    $this->warn('⚠️ قیمت صفر → محصول ناموجود ذخیره می‌شود');
                }

                $sku = 'tpm-'.rand(100000, 999999);

                // ---------- CREATE PRODUCT ----------
                $product = Product::create([
                    'title' => $title,
                    'alias' => $title,
                    'slug' => Str::slug($title).'-'.Str::random(4),
                    'product_category_id' => $oldProduct->product_category_id,
                    'brand_id' => $oldProduct->brand_id,
                    'supplier_id' => '01k86an50vsawm8cjhdhs37thj',
                    'tax_id' => '01k86an54q3xzaf0njwx36bae4',
                    'sku' => $sku,
                    'upc' => $sku,
                    'ean' => $sku,
                    'jan' => $sku,
                    'isbn' => $sku,
                    'mpn' => $sku,
                    'price' => $price,
                    'stock' => $stockValue,
                    'minimum' => 1,
                    'status_promotion' => 0,
                    'status' => 1,
                    'approve' => 1,
                    'image' => $oldProduct->image,
                ]);

                // ---------- COPY PRODUCT IMAGES ----------
                $images = [];
                foreach ($oldProduct->images as $img) {
                    $images[] = [
                        'id' => Str::ulid(),
                        'product_id' => $product->id,
                        'image' => $img->image,
                    ];
                }

                if ($images) {
                    ProductImage::insert($images);
                }

                // ---------- SPECS / ABOUT / DESCRIPTION ----------
                $crawler->filter('div[data-show-max] ul li')->each(function ($li) use ($product, $getText) {

                    $titleSpec = $getText($li, 'div.col-span-1');
                    $value = $getText($li, 'div.col-span-2 div');

                    if (! $titleSpec || ! $value) {
                        return;
                    }

                    // About
                    if (str_contains($titleSpec, 'طریقه') || str_contains($titleSpec, 'استفاده')) {
                        $product->update(['about' => trim($value)]);
                        return;
                    }

                    // Description
                    if (in_array($titleSpec, ['توضیحات', 'توضیحات :', 'سایر توضیحات', 'محل نصب', 'توضیحات تکمیلی'])) {
                        $product->update(['description' => trim($value)]);
                        return;
                    }

                    // Car fields رد شود
                    if (in_array($titleSpec, ['نوع خودرو', 'تیپ خودرو'])) {
                        return;
                    }

                    // Filter
                    $category = $product->category;
                    if ($category) {
                        $filter = $category->filters()->where('title', $titleSpec)->first();
                        if ($filter) {
                            $product->filters()->syncWithoutDetaching([
                                $filter->id => ['value' => $value]
                            ]);
                            return;
                        }
                    }

                    // Spec
                    $exists = $product->specs()
                        ->where('title', $titleSpec)
                        ->where('value', $value)
                        ->first();

                    if (! $exists) {
                        ProductSpecs::create([
                            'product_id' => $product->id,
                            'title' => $titleSpec,
                            'value' => $value,
                        ]);
                    }
                });

                // ---------- CAR MODELS ----------
                $carModelsToAttach = [];

                $carTrims = $getText($crawler, 'li:contains("تیپ خودرو") div.col-span-2');
                $carType = $getText($crawler, 'li:contains("نوع خودرو") div[data-checkbox]');

                $carList = [];

                if ($carType) {
                    $carList[] = $carType;
                }

                if ($carTrims) {
                    $carList = array_merge($carList, preg_split('/،|,/', $carTrims));
                }

                foreach ($carList as $trimName) {

                    $trimName = trim($trimName);
                    if (! $trimName) continue;

                    $carBrand = CarBrand::firstOrCreate([
                        'title' => $trimName
                    ]);

                    $carModel = CarModel::firstOrCreate([
                        'title' => $trimName,
                        'car_brand_id' => $carBrand->id
                    ]);

                    $carModelsToAttach[] = $carModel->id;
                }

                if ($carModelsToAttach) {
                    $product->carModels()->sync($carModelsToAttach);
                }

                // ---------- UPDATE SCRAPED ----------
                $scraped->update([
                    'product_id' => $product->id
                ]);

                DB::commit();

                $this->info("✅ ساخته شد: {$product->id}");

            } catch (\Throwable $e) {

                DB::rollBack();
                $this->error("❌ ".$e->getMessage());
            }
        }

        $this->info('🎉 پایان عملیات');
    }
}
