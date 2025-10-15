<?php

namespace App\Models\Shop;

use App\Models\Model;

class OrderDetail extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'order_id',
        'product_id',
        'title',
        'amount',
        'discount',
        'unit',
        'total_price',
        'tax',
        'attribute',
    ];
    public function order(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
