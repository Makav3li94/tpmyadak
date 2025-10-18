<?php

namespace App\Models\Shop;

use App\Models\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'slug',
        'alias',
        'excerpt',
        'about',
        'description',
        'product_category_id',
        'car_brand_id',
        'car_model_id',
        'brand_id',
        'supplier_id',
        'tax_id',
        'sku',
        'upc',
        'ean',
        'jan',
        'isbn',
        'mpn',
        'image',
        'price',
        'cost',
        'real_price',
        'discount',
        'date_start',
        'date_end',
        'status_promotion',
        'stock',
        'total_view',
        'total_sale',
        'total_comment',
        'total_score',
        'minimum',
        'kind',
        'status',
        'approve',
        'date_lastview',
        'date_available',
    ];
    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ProductCategory::class,'product_category_id','id');
    }
    public function brand(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }
    public function carModels(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(CarModel::class, 'car_model_products');
    }
    public function supplier(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }
    public function tax(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Tax::class, 'tax_id', 'id');
    }
    public function specs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductSpecs::class,'product_id','id');
    }
    public function attributes(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductAttribute::class, 'product_id', 'id');
    }
    public function filters(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Filter::class, 'filter_products')->withPivot('value');
    }
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }


//    public function groups(): \Illuminate\Database\Eloquent\Relations\HasMany
//    {
//        return $this->hasMany(ProductGroup::class, 'group_id', 'id');
//    }

//    public function builds()
//    {
//        return $this->hasMany(ShopProductBuild::class, 'build_id', 'id');
//    }

//    public function stores()
//    {
//        return $this->belongsToMany(AdminStore::class, ShopProductStore::class, 'product_id', 'store_id');
//    }
    protected function excerpt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => strip_tags($value)
        );
    }
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => verta($value)->format('Y-m-d')
        );
    }
}
