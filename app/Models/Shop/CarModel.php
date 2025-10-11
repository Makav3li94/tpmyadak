<?php

namespace App\Models\Shop;

use App\Models\Model;

class CarModel extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'slug',
        'car_brand_id',
    ];

    public function carBrand(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CarBrand::class);
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'car_model_products');
    }
}
