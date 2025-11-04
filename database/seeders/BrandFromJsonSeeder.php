<?php

namespace Database\Seeders;

use App\Models\Shop\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class BrandFromJsonSeeder extends Seeder
{
    public function run(): void
    {
        $path = base_path('database/seeders/brands.json');

        if (! File::exists($path)) {
            $this->command->error("brands.json not found at: {$path}");

            return;
        }

        $json = File::get($path);

        // json_decode will convert \u06xx escapes to UTF-8 Persian strings
        $data = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->command->error('Invalid JSON: '.json_last_error_msg());

            return;
        }

        $count = 0;
        foreach ($data as $item) {
            // title (فارسی) — دیکود شده از JSON
            $title = isset($item['title']) ? (string) $item['title'] : null;

            // prefer explicit english slug from JSON
            $slug = isset($item['slug']) ? trim((string) $item['slug']) : null;

            // alias/image/url/status may exist in JSON
            $alias = isset($item['alias']) ? (string) $item['alias'] : null;
            $image = isset($item['image']) ? (string) $item['image'] : null;
            $url = isset($item['url']) ? (string) $item['url'] : null;
            $status = array_key_exists('status', $item) ? (int) $item['status'] : 1;

            if (! $title) {
                // skip entries without a Persian title
                continue;
            }

            // if slug is empty, try to fallback to alias or generate a slug.
            // NOTE: best to provide an english slug in JSON; fallback may produce non-latin slug.
            if (! $slug) {
                if ($alias && preg_match('/[a-zA-Z0-9\-]/', $alias)) {
                    $slug = $alias;
                } else {
                    // fallback: try to transliterate with Str::slug (may produce hyphenated Persian)
                    $slug = Str::slug($title, '-');
                }
            }

            // ensure slug uniqueness by appending numeric suffix if needed
            $originalSlug = $slug;
            $i = 1;
            while (Brand::where('slug', $slug)->where('title', '!=', $title)->exists()) {
                $slug = $originalSlug.'-'.$i;
                $i++;
            }

            // updateOrCreate by slug (english) — keep title as Persian
            $brand = Brand::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'alias' => $alias,
                    'image' => $image,
                    'url' => $url,
                    'status' => $status,
                ]
            );

            $count++;
        }

        $this->command->info("Imported/updated {$count} brands from brands.json");
    }
}
