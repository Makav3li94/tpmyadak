<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeeklyScraperLog extends Model
{
    protected $table = 'weekly_scraper_logs';

    protected $fillable = [
        'scraped_product_id',
        'model_code',
        'url',
        'status',
        'price_before',
        'price_after',
        'message',
    ];
}
