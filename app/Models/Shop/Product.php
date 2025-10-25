<?php

namespace App\Models\Shop;

use App\Models\Model;
use Digikraaft\ReviewRating\Traits\HasReviewRating;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasReviewRating;
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
        return $this->belongsTo(ProductCategory::class, 'product_category_id', 'id');
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
        return $this->hasMany(ProductSpecs::class, 'product_id', 'id');
    }

    public function attributes(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductAttribute::class, 'product_id', 'id');
    }

    public function attributeGroupsWithDetails()
    {
        return AttributeGroup::with(['attributeDetails' => function ($q) {
            $q->where('product_id', $this->id);
        }])->whereHas('attributeDetails', function ($q) {
            $q->where('product_id', $this->id);
        })->get()->map(function ($group) {
            return [
                'group_id' => $group->id,
                'group_title' => $group->title, // فرض بر اینکه ستون name در AttributeGroup هست
                'attributes' => $group->attributeDetails->map(function ($attr) {
                    return [
                        'id' => $attr->id,
                        'title' => $attr->title ?? null,   // یا هر فیلد مربوطه
                        'add_price' => $attr->add_price ?? null, // مقدار ویژگی
                    ];
                })->values()->toArray(),
            ];
        })->values()->toArray();
    }

    public function getRelatedProducts($limit = 8)
    {
        if (!$this->category) {
            return collect(); // اگر محصول دسته نداشت
        }

        $mainCategoryId = $this->product_category_id;
        $relatedCategoryIds = $this->category->getAllRelatedCategoryIds();

        // اگر دسته‌ای وجود نداشت، هیچ چیز برنگردون
        if (empty($relatedCategoryIds)) {
            return collect();
        }

        // اولویت: دسته فعلی = 1، بقیه = 2
        return self::whereIn('product_category_id', $relatedCategoryIds)
            ->where('id', '!=', $this->id)
            ->select('*')
            ->selectRaw("
            CASE
                WHEN product_category_id = ? THEN 1
                ELSE 2
            END as priority
        ", [$mainCategoryId])
            ->orderBy('priority')
            ->orderByDesc('created_at') // برای نظم بیشتر
            ->limit($limit)
            ->get();
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
            get: fn ($value) => strip_tags($value)
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => verta($value)->format('Y-m-d')
        );
    }
}
