<?php

namespace App\Models\Shop;

use App\Models\Model;

class PaymentMethod extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
    ];
    public function order(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class);
    }
}
