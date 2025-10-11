<?php

namespace App\Models\Shop;

use App\Models\ModelBase;

class AttributeGroup extends ModelBase
{
    protected $guarded = ['id'];
    public $timestamps=false;
    protected $fillable = [
        'title',
        'status',
        'sort',
        'type',
    ];

    public function attributeDetails(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductAttribute::class, 'attribute_group_id', 'id');
    }
}
