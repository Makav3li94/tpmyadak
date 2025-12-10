<?php

namespace App\Console\Commands;

use App\Models\Shop\CarModel;
use App\Models\Shop\Product;
use App\Models\Shop\ProductCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Command: RepairScrapedData
 *
 * Usage:
 *  php artisan scrape:repair {mode=preview}
 *
 * mode: preview | fix
 *
 * Behavior:
 *  - preview: چاپ گزارش از تغییراتی که پیشنهاد می‌شود (بدون تغییر دیتا)
 *  - fix: اعمال تغییرات در دیتابیس (هر تغییر در transaction)
 */
class RepairScrapedData extends Command
{
    protected $signature = 'scrape:repair {mode=preview}';
    protected $description = 'Inspect and repair category-product assignments and car_model associations for scraped products';

    public function handle()
    {
        $mode = $this->argument('mode') ?: 'preview';
        $doFix = $mode === 'fix';

        $this->info("🔎 حالت اجرا: {$mode}");
        $this->line('-----------------------------------------');

        // بخش 1: اصلاح دسته‌بندی‌ها (محصولاتی که در والد هستند ولی باید در فرزند باشند)
        $this->fixCategoryAssignments($doFix);

        $this->line('-----------------------------------------');

        // بخش 2: اصلاح car_model های اشتباه یا جا به جایی مدل‌ها
        $this->fixCarModelAssignments($doFix);

        $this->info('🎉 تمام شد.');
        return Command::SUCCESS;
    }

    /**
     * برای هر دسته‌ای که فرزند دارد، محصولاتی که در آن دسته والد ذخیره شده‌اند
     * را بررسی می‌کنیم و سعی می‌کنیم بهترین فرزند (leaf) را بر اساس تطبیق عنوان/اسلاگ پیدا کنیم.
     */
    /**
     * برای هر دسته‌ای که فرزند دارد، محصولاتی که در آن دسته والد ذخیره شده‌اند
     * را بررسی می‌کنیم و سعی می‌کنیم بهترین فرزند (leaf) را بر اساس:
     *   - تطبیق نام فرزند
     *   - تطبیق slug/alias
     *   - تطبیق عبارت بعد از "مناسب"
     * پیدا کنیم.
     */
    private function fixCategoryAssignments(bool $doFix)
    {
        $this->info('1) بررسی و پیشنهاد اصلاح دسته‌بندی‌ها (محصولات در والد ولی باید در فرزند باشند)');

        // فقط دسته‌هایی که فرزند دارند
        $parents = ProductCategory::whereHas('children')->get();

        $totalMoves = 0;

        foreach ($parents as $parent) {
            $this->line("🔎 دسته والد: [{$parent->id}] {$parent->title}");

            // تمام descendant های برگ
            $descendantIds = $parent->getAllChildrenIds();
            if (empty($descendantIds)) {
                $this->line("   → هیچ فرزندی یافت نشد.");
                continue;
            }

            // فقط برگ‌ها (بدون children)
            $leafChildren = ProductCategory::whereIn('id', $descendantIds)
                ->whereDoesntHave('children')
                ->get();

            if ($leafChildren->isEmpty()) {
                $this->line("   → فرزند برگ وجود ندارد.");
                continue;
            }

            // محصولات که فعلاً در دسته والد ثبت شدند
            $products = Product::where('product_category_id', $parent->id)->get();

            if ($products->isEmpty()) {
                $this->line("   → محصولی در این دسته والد نیست.");
                continue;
            }

            $this->line("   → ".count($products)." محصول برای بررسی.");

            foreach ($products as $product) {
                // فقط محصولاتی که "مناسب" دارند
                if (mb_stripos($product->title, 'مناسب') === false) {
                    continue;
                }

                $normalizedTitle = $this->normalizeString($product->title);
                $parentNorm = $this->normalizeString($parent->title);
                // حذف نام والد از عنوان
                $titleWithoutParent = trim(str_replace($parentNorm, '', $normalizedTitle));

                $bestChildId = null;
                $bestScore = 0;

                foreach ($leafChildren as $child) {
                    $childNorm = $this->normalizeString($child->title);

                    if (empty($childNorm)) {
                        continue;
                    }

                    // تطبیق substring ساده
                    $pos = mb_strpos($titleWithoutParent, $childNorm);
                    if ($pos !== false) {
                        $score = mb_strlen($childNorm); // طول اسم فرزند = امتیاز
                        if ($score > $bestScore) {
                            $bestScore = $score;
                            $bestChildId = $child->id;
                        }
                    }
                }

                // اگر بهترین فرزند پیدا شد و متفاوت از والد است
                if ($bestChildId && $bestChildId !== $product->product_category_id) {
                    $totalMoves++;
                    $this->line("   → پیشنهاد: محصول [{$product->id}] {$product->title}");
                    $this->line("       از دسته: ({$product->product_category_id}) -> به فرزند: ({$bestChildId}) | امتیاز: {$bestScore}");

                    if ($doFix) {
                        DB::transaction(function () use ($product, $bestChildId) {
                            $product->product_category_id = $bestChildId;
                            $product->save();
                        });
                        $this->line("       ✅ اعمال شد.");
                    } else {
                        $this->line("       ⛔ حالت preview — تغییری اعمال نشد.");
                    }
                }
            }
        }

        $this->info("   عملیات دسته‌بندی: {$totalMoves} مورد پیشنهاد جابجایی یافت شد.");
    }







    private function fixCarModelAssignments(bool $doFix)
    {
        $this->info('2) بررسی و اصلاح car_model های محصولات');

        // بارگذاری همه مدل‌ها (برای performance)
        $models = \App\Models\Shop\CarModel::with('carBrand')->get();

        // ساخت نقشه: normalized model title => مدل
        $modelIndex = [];
        foreach ($models as $m) {
            $norm = $this->normalizeString($m->title);
            if (empty($norm)) continue;
            $modelIndex[$norm] = $m;
        }

        $checked = 0;
        $fixed = 0;

        $products = \App\Models\Shop\Product::whereNotNull('title')->get();
        $bar = $this->output->createProgressBar($products->count());
        $bar->start();

        foreach ($products as $product) {
            $checked++;
            $bar->advance();

            $titleNorm = $this->normalizeString($product->title);

            $currentModel = $product->carModels()->first();
            $currentModelTitle = $currentModel ? $this->normalizeString($currentModel->title) : null;

            $best = null;

            // --- مرحله 1: بررسی عبارت بعد از "مناسب" ---
            $modelFromTitle = null;
            if (preg_match('/مناسب\s+(.+?)(?:[\-\(\|]|$)/u', $product->title, $matches)) {
                $modelFromTitle = trim($matches[1]);
            }

            if ($modelFromTitle) {
                $modelFromTitleNorm = $this->normalizeString($modelFromTitle);
                // اگر مدل دقیقا در مدل‌های ثبت شده موجود بود، انتخاب کن
                if (isset($modelIndex[$modelFromTitleNorm])) {
                    $best = $modelIndex[$modelFromTitleNorm];
                }
            }

            // --- مرحله 2: fallback به روش قبلی ---
            if (!$best) {
                $candidates = [];
                foreach ($modelIndex as $norm => $m) {
                    if (mb_strlen($norm) < 3) continue;
                    if (mb_strpos($titleNorm, $norm) !== false) {
                        $candidates[$m->id]['score'] = ($candidates[$m->id]['score'] ?? 0) + mb_strlen($norm);
                        $candidates[$m->id]['model'] = $m;
                    }
                }

                // اگر car_brand_id مشخص است، boost بده
                if (!empty($product->car_brand_id)) {
                    foreach ($candidates as $mid => $info) {
                        $m = $info['model'];
                        if ($m->car_brand_id == $product->car_brand_id) {
                            $candidates[$mid]['score'] += 50;
                        }
                    }
                }

                if (!empty($candidates)) {
                    uasort($candidates, fn($a, $b) => $b['score'] <=> $a['score']);
                    $best = reset($candidates)['model'];
                }
            }

            // --- مرحله 3: بررسی و اعمال تغییر ---
            if ($best) {
                $currentId = $currentModel ? $currentModel->id : null;
                if ($currentId === $best->id) continue;

                $this->line('');
                $this->line("🔧 محصول [{$product->id}] {$product->title} - {$product->sku}");
                $this->line("    مدل فعلی: " . ($currentModel ? $currentModel->title . " (id: $currentId)" : '— ندارد'));
                $this->line("    بهترین مدل پیشنهادی: {$best->title} (id: {$best->id}) | دلیل: تطبیق نام در عنوان/عبارت مناسب");

                if ($doFix) {
                    \Illuminate\Support\Facades\DB::transaction(function () use ($product, $currentId, $best, &$fixed) {
                        $attached = $product->carModels()->pluck('car_models.id')->toArray();
                        if (empty($attached)) {
                            $product->carModels()->attach($best->id);
                            $this->line("    ✅ مدل اضافه شد (attach).");
                        } elseif (count($attached) === 1) {
                            if ($attached[0] !== $best->id) {
                                $product->carModels()->sync([$best->id]);
                                $this->line("    ✅ مدل replace شد (sync).");
                            } else {
                                $this->line("    ⛔ قبلاً همین مدل متصل بود.");
                            }
                        } else {
                            if (!in_array($best->id, $attached, true)) {
                                $product->carModels()->attach($best->id);
                                $this->line("    ✅ مدل اضافه شد (attach) به‌خاطر وجود چند مدل دیگر؛ حذف نکردیم.");
                            } else {
                                $this->line("    ⛔ بهترین مدل همین است و از قبل متصل است.");
                            }
                        }
                        $fixed++;
                    });
                } else {
                    $this->line("    ⛔ حالت preview — تغییری اعمال نشد.");
                }
            }
        }

        $bar->finish();
        $this->line('');
        $this->info("   بررسی مدل‌ها: {$checked} محصول بررسی شد. {$fixed} تغییر اعمال شد (در حالت fix).");
    }


    /**
     * نرمال‌سازی رشته برای مقایسه:
     * - حذف فاصله اضافه، lowercase، حذف کاراکترهای غیرحرف/عدد (جز - و _)
     * - تبدیل فارسی/عربی به یک شکل (اگر لازم بود میشه گسترش داد)
     */
    private function normalizeString(string $s): string
    {
        $s = trim(mb_strtolower($s));
        // replace common persian chars variants
        $replacements = [
            'ك' => 'ک',
            'ي' => 'ی',
            '‌' => ' ', // zero-width non-joiner
            "\t" => ' ',
            "\n" => ' ',
            "\r" => ' ',
            '&nbsp;' => ' ',
        ];
        $s = str_replace(array_keys($replacements), array_values($replacements), $s);
        // remove punctuation except spaces and digits/letters
        $s = preg_replace('/[^\p{L}\p{N}\s\-_]+/u', '', $s);
        // collapse spaces
        $s = preg_replace('/\s+/u', ' ', $s);

        return $s;
    }
    private function extractCarModelFromTitle(string $title): ?string
    {
        // match بعد از "مناسب" تا اولین - یا ( یا | یا انتهای رشته
        if (preg_match('/مناسب\s+(.+?)(?:[\-\(\|]|$)/u', $title, $matches)) {
            $modelString = trim($matches[1]);
            return $modelString ?: null;
        }

        return null;
    }
}
