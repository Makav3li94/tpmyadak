<?php

namespace App\Models\Shop;

use App\Models\Model;

class ProductCategory extends Model
{
    protected $casts = ['filters.pivot.id' => 'string'];

    protected $fillable = [
        'parent_id',
        'title',
        'slug',
        'description',
        'image',
        'status',
        'sort',
    ];

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class,  'id', 'product_category_id');
    }

    public function filters(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Filter::class, 'filter_product_categories');
    }

//    public function stores()
//    {
//        return $this->belongsToMany(AdminStore::class, ShopCategoryStore::class, 'category_id', 'store_id');
//    }

    public function parent(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ProductCategory::class, 'id', 'parent_id')->orderBy('sort');
    }

    public function children(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductCategory::class, 'parent_id', 'id')->orderBy('sort');
    }

    public static function tree(): \Illuminate\Database\Eloquent\Collection
    {
        return static::with(implode('.', array_fill(0, 100, 'children')))->where('parent_id', '=', '0')->orderBy('sort')->get();
    }
    public static function flatTree($categories = null, $level = 0)
    {
        if ($categories === null) {
            $categories = static::tree(); // همون متد خودت
        }

        $result = collect();

        foreach ($categories as $cat) {
            $result->push([
                'value'   => $cat->id,
                'label' => str_repeat('-', $level) . ' ' . $cat->title,
            ]);

            if ($cat->children->isNotEmpty()) {
                $result = $result->merge(self::flatTree($cat->children, $level + 1));
            }
        }

        return $result;
    }



    public function getTreeCategories($parent = 0, &$tree = null, $categories = null, &$st = '')
    {
        $categories = $categories ?? $this->getCategoriesFull();
        $tree = $tree ?? [];
        $lisCategory = $categories[$parent] ?? [];
        foreach ($lisCategory as $category) {
            $tree[$category->id] = $st . $category->name;
            if (!empty($categories[$category->id])) {
                $st .= '--';
                $this->getTreeCategories($category->id, $tree, $categories, $st);
                $st = '';
            }
        }

        return $tree;
    }
    public function getCategoriesFull()
    {
        $listFullCategory = $this->get()->groupBy('parent');
        return $listFullCategory;
    }
}
