<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class Filter extends ModelBase
{
    protected $casts = ['productCategories.pivot.id' => 'string'];
    public $timestamps = false;
    protected $fillable = [
        'title',
    ];
    public function productCategories(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(ProductCategory::class, 'filter_product_categories');
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'filter_products')->withPivot('value');
    }
}
