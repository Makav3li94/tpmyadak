<?php

namespace App\Models;

class Slider extends ModelBase
{
    protected $guarded = ['id'];

    protected $fillable = [
        'image',
        'uri',
        'status',
    ];
}
