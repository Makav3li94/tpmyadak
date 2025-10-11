<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class CarModelProduct extends ModelBase
{
    public $timestamps = false;
    protected $fillable = [
        'product_id',
        'car_model_id',
    ];
}
