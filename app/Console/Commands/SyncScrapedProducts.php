<?php

namespace App\Console\Commands;

use App\Models\ScrapedProduct;
use App\Models\Shop\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class SyncScrapedProducts extends Command
{
    protected $signature = 'scrape:sync-products {limit=10000}';

    protected $description = 'Sync scraped_products with products table using exact title match, fallback to model_code';

    public function handle()
    {
        $limit = (int) $this->argument('limit');
        $records = ScrapedProduct::limit($limit)->get();

        // همه model_code های محصولات سایت
        $allProducts = Product::all(['id', 'title', 'model_code']);
        $allModelCodes = $allProducts->whereNotNull('model_code')->pluck('model_code', 'id')->toArray();

        foreach ($records as $sp) {
            $this->line("🔍 بررسی URL: {$sp->url}");

            try {
                $html = Http::get($sp->url)->body();
                $dom = new Crawler($html);

                // همان getText اسکرپر اصلی
                $getText = fn (Crawler $crawler, string $selector): ?string => $crawler->filter($selector)->count() ? trim($crawler->filter($selector)->first()->text()) : null;

                // عنوان محصول
                $title = $getText($dom, 'h1') ?? null;
                if (! $title) {
                    $this->warn('⚠️ عنوان یافت نشد');

                    continue;
                }
                $title = trim($title);

                $product = null;
                $modelCodeToSave = null;

                // 1️⃣ تلاش اول: تطابق دقیق عنوان
                foreach ($allProducts as $p) {
                    if (trim($p->title) === $title) {
                        $product = $p;
                        break;
                    }
                }

                // 2️⃣ اگر تطابق عنوان پیدا نشد → fallback به بررسی مدل کدها
                if (! $product) {
                    foreach ($allProducts as $p) {
                        if (! $p->model_code) {
                            continue;
                        }

                        // بررسی اینکه model_code دقیقاً در عنوان وجود داشته باشد
                        if (strpos($title, $p->model_code) !== false) {
                            $product = $p;
                            $modelCodeToSave = $p->model_code;
                            break;
                        }
                    }
                }

                // 3️⃣ پر کردن scraped_products
                if ($product) {
                    $sp->product_id = $product->id;
                    if ($modelCodeToSave) {
                        $sp->model_code = $modelCodeToSave;
                    }
                    $sp->save();
                    $this->info("✅ پر شد → product_id: {$product->id}".($modelCodeToSave ? ", model_code: {$modelCodeToSave}" : ''));
                } else {
                    // اسکیپ
                    $this->warn('⚠️ محصول مشابه یافت نشد → اسکیپ شد');
                }

            } catch (\Throwable $e) {
                $this->warn("⚠️ خطا در پردازش URL: {$sp->url} - ".$e->getMessage());

                continue;
            }
        }

        $this->info("\n🎉 تمام شد");
    }
}
