<?php

namespace App\Models\Shop;

use App\Models\Model;

class CarType extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'slug',
        'car_model_id',
    ];

    public function carModel(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CarModel::class);
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'car_type_products');
    }
}
