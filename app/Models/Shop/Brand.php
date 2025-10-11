<?php

namespace App\Models\Shop;

use App\Models\Model;

class Brand extends Model
{
    protected $guarded=['id'];
    protected $fillable = [
        'title',
        'alias',
        'slug',
        'image',
        'url',
        'status',
    ];

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class, 'brand_id', 'id');
    }
}
