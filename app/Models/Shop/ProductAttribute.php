<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class ProductAttribute extends ModelBase
{
    protected $guarded = ['id'];
    public $timestamps = false;
    protected $fillable = [
        'title',
        'attribute_group_id',
        'product_id',
        'add_price',
        'sort',
        'status',
    ];

    public function group(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(AttributeGroup::class, 'attribute_group_id', 'id');
    }
}
