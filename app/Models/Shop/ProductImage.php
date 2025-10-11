<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class ProductImage extends ModelBase
{
    public $timestamps = false;
    protected $fillable = [
        'id',
        'product_id',
        'image',
    ];

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
