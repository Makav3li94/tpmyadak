<?php

namespace App\Models\Shop;

use App\Models\Model;

class Supplier extends Model
{
    protected $guarded =['id'];
    protected $fillable = [
        'title',
        'alias',
        'slug',
        'email',
        'phone',
        'image',
        'address',
        'url',
        'status',
    ];
    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class, 'supplier_id', 'id');
    }
}
