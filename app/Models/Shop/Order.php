<?php

namespace App\Models\Shop;

use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'user_id',
        'transaction_id',
        'address_id',
        'shipping',
        'subtotal',
        'discount',
        'tax',
        'other_fee',
        'total',
        'note',
        'payment_type',
        'payment_method_id',
        'payment_status',
        'shipping_method_id',
        'shipping_status',
        'status',
        'name',
        'postal_code',
        'order_address',
        'mobile',
        'phone',
        'address',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
    public function shippingMethod(): BelongsTo
    {
        return $this->belongsTo(ShippingMethod::class);
    }
    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => verta($value)->format('Y-m-d')
        );
    }
}
