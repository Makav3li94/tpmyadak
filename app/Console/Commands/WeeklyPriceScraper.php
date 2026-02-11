<?php

namespace App\Console\Commands;

use App\Models\ScrapedProduct;
use App\Models\Shop\Product;
use App\Models\WeeklyScraperLog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class WeeklyPriceScraper extends Command
{
    protected $signature = 'scrape:update-prices-hybrid {limit=10000} {--cleanup}';

    protected $description = 'Hybrid weekly price update scraper with logging';

    public function handle()
    {
        $uaPool = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.2 Safari/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        ];

        $handledModelCodes = [];

        $query = ScrapedProduct::whereNotNull('product_id');

        if ($this->option('cleanup')) {
            $doneUrls = WeeklyScraperLog::whereIn('status', ['updated', 'unavailable'])
                ->pluck('url');

            $query->whereNotIn('url', $doneUrls);
        }

        $rows = $query
            ->limit((int) $this->argument('limit'))
            ->get();

        $updatedCount = $unavailableCount = $errorCount = 0;

        foreach ($rows as $row) {
            // مدل کد تکراری را اسکیپ کن
            if ($row->model_code && isset($handledModelCodes[$row->model_code])) {
                continue;
            }
            if ($row->model_code) {
                $handledModelCodes[$row->model_code] = true;
            }

            $priceBefore = Product::where('id', $row->product_id)->value('price') ?? 0;
            $priceAfter = null;
            $status = 'error';
            $message = null;

            try {
                $html = $this->fetchHtmlHybrid($row->url, $uaPool);

                if (! $html) {
                    $message = 'Failed to fetch HTML';
                    $errorCount++;
                } else {
                    $dom = new Crawler($html);

                    // ناموجود
                    if ($dom->filter('span:contains("ناموجود")')->count()) {
                        $priceAfter = 0;
                        $status = 'unavailable';
                        $this->applyPrice($row, $priceAfter);
                        $unavailableCount++;
                        $message = 'Product unavailable';
                    } else {
                        // قیمت
                        $priceNode = $dom->filter('span.font-bold')->first();
                        if ($priceNode->count()) {
                            $price = (int) preg_replace('/[^0-9]/', '', $priceNode->text());
                            $priceAfter = max(0, $price - $this->discount($price));
                            $this->applyPrice($row, $priceAfter);
                            $status = 'updated';
                            $updatedCount++;
                        } else {
                            $message = 'Price node not found';
                            $errorCount++;
                        }
                    }
                }
            } catch (\Throwable $e) {
                $message = $e->getMessage();
                $errorCount++;
            }

            // ثبت لاگ
            WeeklyScraperLog::create([
//                'scraped_product_id' => $row->product_id,
                'scraped_product_id' => $row->id,
                'model_code' => $row->model_code,
                'url' => $row->url,
                'status' => $status,
                'price_before' => $priceBefore,
                'price_after' => $priceAfter,
                'message' => $message,
            ]);

            $this->info("Processed: {$row->url} | Status: {$status}");
//            sleep(rand(3, 7));
            sleep(1);
        }

        $this->info("✅ Updated: $updatedCount, ⚠️ Unavailable: $unavailableCount, ❌ Errors: $errorCount");
    }

    private function fetchHtmlHybrid(string $url, array $uaPool): ?string
    {
        $servers = [
            'foreign' => 'https://api.parnasite.com/fetch?url='.urlencode($url),
            'local' => $url,
        ];

        foreach ($servers as $type => $endpoint) {
            try {
                $ua = $uaPool[array_rand($uaPool)];
                $response = Http::withHeaders([
                    'User-Agent' => $ua,
                    'Accept' => 'text/html,application/xhtml+xml',
                    'Accept-Language' => 'fa-IR,fa;q=0.9',
                ])->timeout(20)->get($endpoint);

                if ($response->status() === 200) {
                    return $response->body();
                }

                // ban detector
                if (in_array($response->status(), [429, 403])) {
//                    sleep($type === 'foreign' ? 120 : 10);
                    sleep(3);

                    continue;
                }
            } catch (\Throwable $e) {
                sleep(1);
//                sleep(5);

                continue;
            }
        }

        return null;
    }

    private function applyPrice(ScrapedProduct $row, int $price): void
    {
        if ($row->model_code) {
            Product::where('model_code', $row->model_code)->update([
                'price' => $price,
                'stock' => $price > 0 ? 1 : 0,
            ]);
        } else {
            Product::where('id', $row->product_id)->update([
                'price' => $price,
                'stock' => $price > 0 ? 1 : 0,
            ]);
        }
    }

    private function discount(int $price): int
    {
        return match (true) {
            $price < 100_000 => 1000,
            $price < 500_000 => rand(3, 5) * 1000,
            $price < 1_000_000 => rand(7, 10) * 1000,
            $price < 2_000_000 => rand(15, 20) * 1000,
            $price < 3_000_000 => rand(25, 30) * 1000,
            $price < 5_000_000 => rand(35, 40) * 1000,
            default => 50_000,
        };
    }
}
