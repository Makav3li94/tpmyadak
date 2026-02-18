<?php

namespace App\Console\Commands;

use App\Models\ScrapedProduct;
use App\Models\Shop\Product;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\CarType;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;

class FixCarHierarchyFromScraped extends Command
{
    protected $signature = 'scraper:fix-car-hierarchy';
    protected $description = 'Extract car_brand, car_model and car_types from scraped_products links';

    public function handle()
    {
        $this->info('🚀 شروع اصلاح ساختار خودرو...');

        $scrapedProducts = ScrapedProduct::whereNotNull('product_id')->get();

        foreach ($scrapedProducts as $scraped) {

            // 🌀 Reset متغیرهای موقت برای هر iteration
            $carBrandName = null;
            $carModelName = null;
            $carTypesRaw = [];
            $carTypeIds = [];

            DB::beginTransaction();

            try {
                $product = Product::find($scraped->product_id);
                if (! $product) {
                    $this->warn("محصول پیدا نشد: {$scraped->product_id}");
                    DB::rollBack();
                    continue;
                }

                $response = Http::timeout(60)->get($scraped->url);
                if (! $response->successful()) {
                    $this->warn("خطا در دریافت لینک: {$scraped->url}");
                    DB::rollBack();
                    continue;
                }

                $crawler = new Crawler($response->body());

                // ---- برند خودرو ----
                $brandNode = $crawler->filterXPath('//div[contains(text(),"برند خودرو")]/following-sibling::div//span');
                if ($brandNode->count()) {
                    $carBrandName = trim($brandNode->text());
                }

                // ---- نوع خودرو ----
                $modelNode = $crawler->filterXPath('//div[contains(text(),"نوع خودرو")]/following-sibling::div//span');
                if ($modelNode->count()) {
                    $carModelName = trim($modelNode->text());
                }

                // ---- تیپ خودرو ----
                $typeNodes = $crawler->filterXPath('//div[contains(text(),"تیپ خودرو")]/following-sibling::div//span');
                if ($typeNodes->count()) {
                    $typeNodes->each(function ($node) use (&$carTypesRaw) {
                        $text = trim($node->text());
                        if ($text) {
                            // جدا کردن با ویرگول
                            $parts = preg_split('/،|,/', $text);
                            foreach ($parts as $part) {
                                $part = trim($part);
                                if ($part) $carTypesRaw[] = $part;
                            }
                        }
                    });
                    // حذف duplicate
                    $carTypesRaw = array_unique($carTypesRaw);
                }

                // اگر برند یا مدل نداشت → رد کن
                if (! $carBrandName || ! $carModelName) {
                    $this->warn("محصول خودرو ندارد: {$scraped->product_id}");
                    DB::rollBack();
                    continue;
                }

                // ---------- Car Brand ----------
                $carBrand = CarBrand::firstOrCreate(
                    ['title' => $carBrandName],
                    ['slug' => Str::slug($carBrandName)]
                );

                // ---------- Car Model ----------
                $carModel = CarModel::firstOrCreate(
                    [
                        'title' => $carModelName,
                        'car_brand_id' => $carBrand->id
                    ],
                    [
                        'slug' => Str::slug($carModelName)
                    ]
                );

                // ست کردن داخل محصول
                $product->update([
                    'car_brand_id' => $carBrand->id,
                    'car_model_id' => $carModel->id,
                ]);

                // ---------- Car Types ----------
                foreach ($carTypesRaw as $typeName) {
                    $carType = CarType::firstOrCreate(
                        [
                            'title' => $typeName,
                            'car_model_id' => $carModel->id
                        ],
                        [
                            'slug' => Str::slug($typeName)
                        ]
                    );
                    $carTypeIds[] = $carType->id;
                }

                if (! empty($carTypeIds)) {
                    $product->carTypes()->syncWithoutDetaching($carTypeIds);
                }

                DB::commit();

                $this->info("✅ اصلاح شد: {$product->id}");

                // 💤 Sleep کوچک برای جلوگیری از فشار روی سایت
                sleep(1);

            } catch (\Throwable $e) {
                DB::rollBack();
                $this->error("❌ خطا در محصول {$scraped->product_id}: " . $e->getMessage());
            }
        }

        $this->info('🎉 پایان عملیات');
    }
}
