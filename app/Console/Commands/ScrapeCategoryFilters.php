<?php

namespace App\Console\Commands;

use App\Models\Shop\Filter;
use App\Models\Shop\ProductCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class ScrapeCategoryFilters extends Command
{
    protected $signature = 'scrape:category-filters';

    protected $description = 'استخراج فیلترهای اختصاصی هر دسته و اتصال به product_categories';

    public function handle()
    {
        $categories = ProductCategory::where('status', 1)->get();

        foreach ($categories as $category) {

            $url = 'https://www.mryadaki.com/main/'.$category->slug.'/';

            $this->info("🔍 در حال بررسی: {$category->title} | {$url}");

            try {
                $html = Http::get($url)->body();
            } catch (\Exception $e) {
                $this->error("❌ خطا در دریافت صفحه: {$e->getMessage()}");

                continue;
            }

            $crawler = new Crawler($html);

            // فقط li.text-sm   →  فیلترهای اختصاصی
            $crawler->filter('ul.divide-y li.text-sm')->each(function ($node) use ($category) {

                // عنوان فیلتر
                $titleNode = $node->filter('[data-type]');
                if ($titleNode->count() === 0) {
                    return; // فیلتر اختصاصی نیست
                }

                $filterTitle = trim($titleNode->text());

                // رد کردن فیلترهای ثابت
                $skip = ['نوع خودرو', 'مدل خودرو', 'برند ها', 'محدوده قیمت', 'فقط موجود', 'فقط فروش ویژه'];
                if (in_array($filterTitle, $skip)) {
                    return;
                }

                // ساخت یا پیدا کردن فیلتر
                $filter = Filter::firstOrCreate([
                    'title' => $filterTitle,
                ]);

                // اتصال به دسته بدون تکرار
                $category->filters()->syncWithoutDetaching([$filter->id]);

                $this->info("✅ فیلتر ثبت شد: {$filterTitle} → دسته: {$category->title}");
            });

            $this->line('--------------------------------------------------');
        }

        $this->info('🎉 تمام شد — فیلترهای اختصاصی دسته‌ها ثبت و وصل شدند.');

        return Command::SUCCESS;
    }
}
