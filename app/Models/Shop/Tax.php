<?php

namespace App\Models\Shop;

use App\Models\Model;

class Tax extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'value',
    ];

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class, 'tax_id', 'id');
    }
}
