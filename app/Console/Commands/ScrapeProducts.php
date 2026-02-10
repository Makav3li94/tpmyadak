<?php

namespace App\Console\Commands;

use App\Models\ScrapedProduct;
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
    protected $signature = 'scrape:products {limit=7000}';

    protected $description = 'Scrape products from MrYadaki (test mode)';

    public function handle()
    {
        ini_set('memory_limit', '512M');
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
        $allBrands = Brand::all(['id', 'title', 'slug']);
        $allCarBrands = CarBrand::all(['id', 'title']);
        $allCarModels = CarModel::all(['id', 'title']);
        $allCategories = ProductCategory::all(['id', 'title']);
        foreach ($links as $key => $url) {
            $num = ++$key;
            $this->line("\n🔍 شماره: $num");
            if (ScrapedProduct::where('url', $url)->exists()) {
                $this->warn("⏭️ قبلا ذخیره شده → $url");

                continue;
            }
            $this->line("\n🔍 محصول: $url");

            $html = Http::get($url)->body();
            $dom = new Crawler($html);

            $getText = fn (Crawler $crawler, string $selector): ?string => $crawler->filter($selector)->count() ? trim($crawler->filter($selector)->first()->text()) : null;

            // Title
            $title = $getText($dom, 'h1') ?? 'بدون عنوان';

            // استخراج model_code
            // Model Code Detection (Supports alpha-numeric and pure numeric codes)
            $modelCode = null;

            // اول کدهای ترکیبی مثل K6RTM3
            if (preg_match('/([A-Z]{1,}[0-9]{2,}[A-Z0-9]*)/i', $title, $m)) {
                $modelCode = $m[1];
            }
            // اگر پیدا نشد → دنبال کدهای تمام دیجیت ۵ تا ۱۰ رقمی
            elseif (preg_match('/\b([0-9]{5,10})\b/', $title, $m)) {
                $modelCode = $m[1];
            }

            if ($modelCode) {
                $modelCode = trim($modelCode);
            }

            $slugBase = slug_gen($title);
            $slug = $slugBase;
            $counter = 1;

            while (Product::where('slug', $slug)->exists()) {
                $slug = $slugBase.'-'.$counter++;
            }
            // --- دسته‌بندی ---
            $catName = $getText($dom, 'li:contains("دسته بندی") div[data-checkbox]');
            $category = $catName ? findSimilarRecord(ProductCategory::class, $catName, $allCategories) : null;
            if (! $category) {
                $category = ProductCategory::firstOrCreate(['slug' => 'other'], [
                    'title' => 'سایر',
                    'parent_id' => 0,
                    'status' => 1,
                ]);
            }

            $categoryTitle = $category->title;

            // --- دسته‌های حذف کامل ---
            $skipCategories = [
                'قاب بلندگو', 'سایر محصولات',
            ];

            if (in_array($categoryTitle, $skipCategories)) {
                $this->warn("⏭️ دسته {$categoryTitle} حذف شد");
                ScrapedProduct::create(['url' => $url]); // ثبت اسکیپ

                continue;
            }

            // --- برند از HTML (فقط متن، بدون ساخت در DB) ---
            $producerBrandName = $getText($dom, 'li:contains("شرکت سازنده") > div:nth-child(2) div') ?? '';
            $producerBrandName = trim($producerBrandName);

            // --- لیست برندهای ممنوع براساس دسته ---
            $skipCategoryBrands = [
                'پلوس' => ['mka', 'ام کی ای', 'جی بی کی', 'لیزر', 'بلبرینگ'],
                'جعبه فرمان' => ['طوس'],
                'توپی چرخ' => ['اف ای جی', 'جی بی کی'],
                'کوئل' => ['ایران کاربراتور', 'والئو'],
                'پمپ بنزین' => ['ایران کاربراتور', 'لیزر'],
                'فشنگی خودرو' => ['دنیا پارت'],
                'دریچه گاز' => ['لیزر'],
                'سنسور ها' => ['لیزر'],
                'لنت ترمز' => ['گیپارت', 'هایما', 'سوزوکی', 'gold', 'بلو', 'سگال', 'های کیو', 'والئو'],
                'دیسک ترمز' => ['سوزوکی', 'هایما', 'تلدا'],
                'شمع موتور' => ['سوزوکی', 'هایما', 'اکیوم'],
                'صافی بنزین' => ['سوزوکی', 'هایما', 'لوکو موبیل'],
                'تیغه برف پاک کن' => ['سوزوکی', 'هایما', 'مکس', 'ام دی اچ', 'لیزر'],
                'فیلتر روغن' => ['سوزوکی', 'هایما', 'لوکو موبیل'],
                'فیلتر هوا کابین' => ['والئو', 'سوزوکی', 'هایما', 'لوکو موبیل'],
                'فیلتر هوا موتور' => ['سوزوکی', 'هایما', 'او‌ای مکس', 'اونوری', 'فیلتر سبز', 'لوکو موبیل'],
                'کاسه ترمز' => ['سوزوکی', 'هایما'],
                'بلبرینگ کلاچ' => ['اف ای جی', 'بلبرینگ حامد', 'جی بی کی'],
                'کاسه نمد گیربکس' => ['سی بی اس'],
                'روغن موتور' => ['آترود', 'ونول'],
                'روغن گیربکس' => ['آترود', 'هایما'],
                'گریس' => ['آترود', 'اف ای حی', 'گتسان'],
                'ضدیخ' => ['گتسان', 'آترود'],
                'تسمه تایم' => ['بوش', 'اف ای جی', 'فانتوم'],
                'بلبرینگ تسمه تایم' => ['اف ای جی', 'جی بی کی', 'بلبرینگ حامد', 'ایران کاربراتور'],
                'تسمه دینام' => ['فانتوم', 'مولدد', 'کانتیننتال'],
                'بلبرینگ تسمه دینام' => ['اف ای جی', 'ایران کاربراتور', 'جی بی کی'],
                'تسمه کولر' => ['فانتوم'],
                'وایر شمع' => ['یوتا', 'بوجیکورد', 'گرین پاور', 'ایران کاربراتور'],
                'واتر پمپ' => ['اف ای جی', 'fag'],
                'سر سیلندر' => ['ایران کاربراتور'],
                'کاسه نمد سوپاپ' => ['سی بی اس', 'تی‌تی‌او'],
                'سوزن انژکتور' => ['لیزر'],
                'کاسه نمد میل لنگ' => ['سی بی اس'],
                'میل سوپاپ' => ['دنیا پارت'],
                'کمک فنر' => ['ایران کاربراتور'],
                'بلبرینگ چرخ' => ['اف ای جی'],
                'چسب دوقلو' => ['غفاری'],
                'واكس و پولیش بدنه' => ['سوناکس', 'فرمول وان', 'مادرز', 'اس تی پی'],
                'انژكتور شوی' => ['تاپ وان', 'گام اوت', 'کسیت'],
                'اسپری داشبورد' => ['فرمول وان', 'اسنوپ'],
            ];

            // --- چک اسکیپ ---
            if (isset($skipCategoryBrands[$categoryTitle]) && $producerBrandName !== '') {

                // نرمالایز کننده: حذف فاصله، دش، نیم‌فاصله، lowercase
                $normalize = fn ($str) => mb_strtolower(preg_replace('/[\s\-\_‌]+/u', '', trim((string) $str)));

                $producerBrandNameNormalized = $normalize($producerBrandName);

                // تلاش می‌کنیم برند داخل جدول برندها پیدا کنیم (title یا slug)
                $foundBrandInTable = $allBrands->first(function ($b) use ($normalize, $producerBrandNameNormalized) {
                    $bt = $normalize($b->title);
                    $bs = $normalize($b->slug ?? Str::slug($b->title));

                    return $bt === $producerBrandNameNormalized || $bs === $producerBrandNameNormalized;
                });

                foreach ($skipCategoryBrands[$categoryTitle] as $skipBrand) {
                    $skipNormalized = $normalize($skipBrand);

                    // مقایسه با نام داخل HTML
                    if ($producerBrandNameNormalized === $skipNormalized) {
                        $this->warn("⏭️ رد شد → {$producerBrandName} در {$categoryTitle} (match by HTML title)");
                        ScrapedProduct::create(['url' => $url]); // ثبت اسکیپ

                        continue 2;
                    }

                    // اگر برند در جدول بود، مقایسه با title/slug اون رکورد هم انجام بده
                    if ($foundBrandInTable) {
                        $foundTitleNorm = $normalize($foundBrandInTable->title);
                        $foundSlugNorm = $normalize($foundBrandInTable->slug ?? Str::slug($foundBrandInTable->title));
                        if ($foundTitleNorm === $skipNormalized || $foundSlugNorm === $skipNormalized) {
                            ScrapedProduct::create(['url' => $url]); // ثبت اسکیپ
                            $this->warn("⏭️ رد شد → {$foundBrandInTable->title} در {$categoryTitle} (match by DB)");

                            continue 2;
                        }
                    }
                }
            }

            // حالا که اسکیپ نشد → ایجاد/پیدا کردن برند (با findSimilarRecord)
            $producerBrand = $producerBrandName
                ? findSimilarRecord(Brand::class, $producerBrandName, $allBrands)
                : Brand::firstWhere('slug', 'tpm');

            $brandId = $producerBrand?->id ?? Brand::firstWhere('slug', 'tpm')->id;

            // قیمت
            $priceText = $getText($dom, 'span.font-bold');
            $price = $priceText ? intval(preg_replace('/[^0-9]/', '', $priceText)) : 0;
            $stockValue = $price > 0 ? 1 : 0;
            if ($price == 0) {
                $this->warn('⚠️ قیمت یافت نشد → محصول با وضعیت `ناموجود` ذخیره می‌شود');
            }

            // برند خودرو
            $carBrandName = $getText($dom, 'li:contains("برند خودرو") div[data-checkbox]');
            $carBrand = $carBrandName ? findSimilarRecord(CarBrand::class, $carBrandName, $allCarBrands) : null;
            if (! $carBrand) {
                $carBrand = CarBrand::firstOrCreate(
                    ['slug' => 'all'],
                    ['title' => 'all', 'alias' => 'all', 'status' => 1]
                );
            }

            // بررسی محصول مشابه بر اساس model_code
            $existingProduct = $modelCode ? Product::where('model_code', $modelCode)->first() : null;

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
                $model = findSimilarRecord(CarModel::class, $trimName, $allCarModels, ['car_brand_id' => $carBrand->id]);
                $carModelsToAttach[] = $model->id;
            }

            if ($existingProduct) {
                $product = $existingProduct;

                // فقط محصول مشابه → عنوان کوتاه
                $cleanTitle = preg_replace('/\s*مناسب\s.+$/u', '', $title);
                $product->update([
                    'title' => $cleanTitle,
                    'alias' => $cleanTitle,
//                    'slug' => Str::slug($cleanTitle),
                ]);

                if ($carModelsToAttach) {
                    $product->carModels()->syncWithoutDetaching($carModelsToAttach);
                    $this->line('ℹ️ محصول مشابه یافت شد → مدل‌های خودرو اضافه شدند: '.implode(', ', $carModelsToAttach));
                }
            } else {
                // محصول جدید
                $sku = 'tpm-'.rand(100000, 999999);
                $product = Product::create([
                    'title' => $title,
                    'alias' => $title,
                    'slug' => $slug,
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
                    'stock' => $stockValue, // ✅ اینجا وابسته به قیمت شد
                    'minimum' => 1,
                    'status_promotion' => 0,
                    'model_code' => $modelCode,
                ]);

                if ($carModelsToAttach) {
                    $product->carModels()->sync($carModelsToAttach);
                    $this->line('🚗 مدل‌های خودرو متصل شد: '.implode(', ', $carModelsToAttach));
                }
            }

            // Specs + About + Description
            $dom->filter('div[data-show-max] ul li')->each(function ($li) use ($product, $getText) {
                $titleSpec = $getText($li, 'div.col-span-1');
                $value = $getText($li, 'div.col-span-2 div');
                if (! $titleSpec || ! $value) {
                    return;
                }

                // About
                if (str_contains($titleSpec, 'طریقه') || str_contains($titleSpec, 'استفاده')) {
                    $product->about = trim($value);
                    $product->save();

                    return;
                }

                // Description
                if ($titleSpec === 'توضیحات' || $titleSpec === 'توضیحات :' || $titleSpec === 'سایر توضیحات' || $titleSpec === 'محل نصب' || $titleSpec === 'توضیحات تکمیلی') {
                    $product->description = trim($value);
                    $product->save();

                    return;
                }

                // Car Models → ذخیره نکن
                if (in_array($titleSpec, ['نوع خودرو', 'تیپ خودرو'])) {
                    return;
                }

                // Filter
                $category = $product->category;
                if (! $category) {
                    return;
                }

                $filter = $category->filters()->where('title', $titleSpec)->first();
                if ($filter) {
                    $product->filters()->syncWithoutDetaching([$filter->id => ['value' => $value]]);

                    return;
                }

                // Spec → فقط اگر مقدار تکراری نباشد
                $existing = $product->specs()->where('title', $titleSpec)->where('value', $value)->first();
                if (! $existing) {
                    ProductSpecs::create([
                        'product_id' => $product->id,
                        'title' => $titleSpec,
                        'value' => $value,
                    ]);
                }
            });
            if (! $product->description) {
                $product->description = $product->title.' مناسب '.$category->title;
                $product->save();
            }
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

            $this->info('✅ ذخیره شد: '.$product->title);
            ScrapedProduct::create([
                'url' => $url,
                'product_id' => $product->id,
                'model_code' => $modelCode,
            ]);

        }

        $this->info("\n🎉 تمام شد");
    }
}
