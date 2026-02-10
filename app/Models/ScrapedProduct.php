<?php

namespace App\Models;

use App\Models\Shop\Product;
use Illuminate\Database\Eloquent\Model;

class ScrapedProduct extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'url';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'url',
        'product_id',
        'model_code',
        'created_at',
    ];

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
