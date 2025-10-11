<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class ProductSpecs extends ModelBase
{
    protected $guarded = ['id'];
    public $timestamps = false;
    protected $fillable = [
        'product_id',
        'title',
        'value',
    ];

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
