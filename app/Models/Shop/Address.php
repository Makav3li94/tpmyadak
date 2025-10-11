<?php

namespace App\Models\Shop;


use App\Models\ModelSimple;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends ModelSimple
{
    protected $guarded = ['id'];
    protected $fillable = [
        'user_id',
        'name',
        'postal_code',
        'm_code',
        'mobile',
        'phone',
        'address',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
