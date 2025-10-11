<?php

namespace App\Models\Shop;

use App\Models\ModelBase;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends ModelBase
{
    protected $guarded = [
        'id',
    ];
    protected $fillable = [
       'user_id',
       'order_id',
       'price',
       'status',
       'type',
       'transaction_id',
       'verify_code',
       'transaction_status',
    ];
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => verta($value)->formatJalaliDatetime()
        );
    }
}
