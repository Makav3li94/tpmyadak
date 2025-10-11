<?php

namespace App\Models\Shop;

use App\Models\Model;

class ShippingMethod extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'cost'
    ];

    public function order(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class);
    }
}
