<?php

namespace App\Models\Shop;

use App\Models\Model;

class CarBrand extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'slug',
    ];
    public function carModels(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CarModel::class);
    }

}
