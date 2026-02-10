<?php

namespace App\Console\Commands;

use App\Models\ScrapedProduct;
use App\Models\Shop\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class WeeklyPriceScraper extends Command
{
    protected $signature = 'scrape:update-prices-hybrid {limit=500}';

    protected $description = 'Hybrid weekly price update scraper using foreign API with fallback';

    public function handle()
    {
        $uaPool = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.2 Safari/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        ];

        $handledModelCodes = [];

        $rows = ScrapedProduct::whereNotNull('product_id')
            ->limit((int) $this->argument('limit'))
            ->get();

        foreach ($rows as $row) {
            // dedupe model_code
            if ($row->model_code && isset($handledModelCodes[$row->model_code])) {
                continue;
            }
            if ($row->model_code) {
                $handledModelCodes[$row->model_code] = true;
            }

            $html = $this->fetchHtmlHybrid($row->url, $uaPool);
            if (! $html) {
                $this->warn("Failed to fetch: {$row->url}");

                continue;
            }

            $dom = new Crawler($html);

            // ناموجود
            if ($dom->filter('span:contains("ناموجود")')->count()) {
                $this->applyPrice($row, 0);
                sleep(rand(3, 6));

                continue;
            }

            $priceNode = $dom->filter('span.font-bold')->first();
            if (! $priceNode->count()) {
                sleep(rand(3, 6));

                continue;
            }

            $price = (int) preg_replace('/[^0-9]/', '', $priceNode->text());
            $finalPrice = max(0, $price - $this->discount($price));

            $this->applyPrice($row, $finalPrice);
            sleep(rand(3, 7));
        }

        $this->info('Done.');
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

                if (in_array($response->status(), [429, 403])) {
                    sleep($type === 'foreign' ? 120 : 10);

                    continue;
                }

            } catch (\Throwable $e) {
                sleep(5);

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
            $price < 500_000 => rand(3000, 5000),
            $price < 1_000_000 => rand(7000, 10000),
            $price < 2_000_000 => rand(15000, 20000),
            $price < 3_000_000 => rand(25000, 30000),
            $price < 5_000_000 => rand(35000, 40000),
            default => 50000,
        };
    }
}
