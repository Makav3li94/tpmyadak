<?php

namespace App\Console\Commands;

use App\Models\File;
use App\Models\Shop\ProductCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File as FileSystem;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;
use Symfony\Component\DomCrawler\Crawler;

// 👈 این خط مهمه!

class ScrapeProductCategories extends Command
{
    protected $signature = 'scrape:categories';

    protected $description = 'Scrape product categories (with hierarchy and images) from mryadaki.com';

    public function handle(): void
    {
        $sitemapUrl = 'https://www.mryadaki.com/sitemap-categories.xml';
        $this->info("📡 دریافت سایت‌مپ: {$sitemapUrl}");

        $response = Http::get($sitemapUrl);
        if (! $response->ok()) {
            $this->error('❌ خطا در دریافت سایت‌مپ.');

            return;
        }

        preg_match_all('/<loc>(.*?)<\/loc>/', $response->body(), $matches);
        $urls = $matches[1] ?? [];

        $this->info('✅ '.count($urls).' لینک دسته‌بندی پیدا شد.');

        // =====================
        // فاز ۱: ایندکس تمام دسته‌ها
        // =====================
        foreach ($urls as $url) {
            $slug = $this->makeSlugFromUrl($url);
            $title = urldecode(basename($slug));

            ProductCategory::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'parent_id' => 0,
                    'status' => 1,
                ]
            );
        }

        $this->info('🧱 فاز ۱ کامل شد: همه دسته‌ها ایندکس شدند.');

        // =====================
        // فاز ۲: ساخت روابط والد/فرزند و ذخیره تصاویر
        // =====================
        foreach ($urls as $url) {
            $slug = $this->makeSlugFromUrl($url);
            $parent = ProductCategory::where('slug', $slug)->first();

            if (! $parent) {
                continue;
            }

            $this->line("🔍 در حال بررسی دسته: {$parent->title}");

            try {
                $html = Http::timeout(15)->get($url)->body();
                $crawler = new Crawler($html);

                // پیدا کردن زیر‌دسته‌ها
                $crawler->filter('div.swiper-wrapper a')->each(function (Crawler $node) use ($parent) {
                    $subTitle = trim($node->filter('div')->last()->text(''));
                    $href = $node->attr('href');
                    $imgUrl = $node->filter('img')->count() ? $node->filter('img')->attr('src') : null;

                    if (! $href || ! $subTitle) {
                        return;
                    }

                    $subSlug = $this->makeSlugFromUrl($href);
                    $fileRecord = null;
                    $imagePath = null;

                    if ($imgUrl) {
                        $fileRecord = $this->downloadAndCompressImage($node, 'category');
                        $imagePath = $fileRecord?->hash_name;
                    }

                    ProductCategory::updateOrCreate(
                        ['slug' => $subSlug],
                        [
                            'title' => $subTitle,
                            'parent_id' => $parent->id,
                            'status' => 1,
                            'image' => $imagePath,
                        ]
                    );
                });

            } catch (\Throwable $e) {
                $this->warn("⚠️ خطا در پردازش {$url}: {$e->getMessage()}");
            }
        }

        $this->info('🎯 همه روابط والد/فرزند و تصاویر ذخیره شدند.');
    }

    private function makeSlugFromUrl(string $url): string
    {
        $path = parse_url($url, PHP_URL_PATH);
        $slug = trim(basename($path), '/');

        return urldecode($slug); // حفظ فارسی
    }

    private function downloadAndCompressImage(Crawler $node, string $dir): ?File
    {
        try {
            // دریافت لینک تصویر از src یا data-original
            $imgUrl = $node->filter('img')->count() ? $node->filter('img')->attr('src') : null;
            $dataOriginal = $node->filter('img')->count() && $node->filter('img')->attr('data-original')
                ? $node->filter('img')->attr('data-original')
                : null;

            // اگر src اشتباه بود ولی data-original درست بود، از اون استفاده کن
            if ((! $imgUrl || ! Str::contains($imgUrl, 'cdn.mryadaki.com')) && $dataOriginal) {
                $imgUrl = $dataOriginal;
            }

            // اگه هنوز هم لینک به CDN نیست، رد کن
            if (! $imgUrl || ! Str::contains($imgUrl, 'cdn.mryadaki.com')) {
                $this->warn("⏭️ رد شد (بدون تصویر معتبر): {$imgUrl}");

                return null;
            }

            $response = Http::timeout(20)->get($imgUrl);
            if (! $response->ok() || empty($response->body())) {
                $this->warn("⚠️ تصویر یافت نشد: {$imgUrl}");

                return null;
            }

            $uuid = uniqid();
            $hashName = $uuid.'.webp';
            $folderPath = storage_path("app/public/{$dir}/");

            if (! FileSystem::exists($folderPath)) {
                FileSystem::makeDirectory($folderPath, 0755, true);
            }

            $manager = new ImageManager(new Driver);
            $image = $manager->read($response->body())->resize(350, 350);

            $wmW = (int) ($image->width() * 0.18);
            $wmH = (int) ($image->height() * 0.21 ); // افزایش 10 درصد

            $whitePatch = $manager->create($wmW, $wmH);
            $whitePatch->fill('#ffffff');

            $image->place($whitePatch, 'top-left', 0, 0, 100);

            $image->encode(new WebpEncoder(quality: 70))
                ->save($folderPath . $hashName);

            // ثبت در جدول File
            return File::create([
                'upload_name' => basename($imgUrl),
                'hash_name' => $hashName,
                'name' => basename($imgUrl),
                'type' => File::FILE,
            ]);

        } catch (\Throwable $e) {
            $this->warn("⚠️ خطا در دانلود تصویر: {$e->getMessage()}");

            return null;
        }
    }
}
