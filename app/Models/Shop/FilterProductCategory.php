<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class FilterProductCategory extends ModelBase
{
    protected $fillable = [
        'product_category_id',
        'filter_id',
    ];
}
