<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class FilterProduct extends ModelBase
{
    public $timestamps = false;
    protected $fillable = [
        'product_id',
        'filter_id',
        'value',
    ];
}
