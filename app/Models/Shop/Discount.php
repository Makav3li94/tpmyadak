<?php

namespace App\Models\Shop;

use App\Models\Model;
use App\Models\User;

class Discount extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'user_id',
        'product_category_id',
        'title',
        'code',
        'percentage',
        'max_limit',
        'max_minus',
        'active_at',
        'expire_at',
        'status',
    ];
    protected $appends = [
        'fucking_active_at',
        'fucking_expire_at',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function productCategory(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }

    protected function getFuckingActiveAtAttribute(): string
    {
        return verta($this->active_at)->format('Y-m-d');
    }

    protected function getFuckingExpireAtAttribute(): string
    {
        return verta($this->expire_at)->format('Y-m-d');
    }
}
