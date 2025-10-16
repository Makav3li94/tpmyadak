<?php

namespace App\Models\Shop;

use App\Models\ModelBase;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Wishlist extends ModelBase
{
    protected $guarded = ['id'];

    protected $fillable = [
        'user_id',
        'product_id',
        'status',
    ];

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => verta($value)->formatDifference()
        );
    }
}
