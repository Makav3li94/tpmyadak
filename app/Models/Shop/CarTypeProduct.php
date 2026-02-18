<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class CarTypeProduct extends ModelBase
{
    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'car_type_id',
    ];
}
