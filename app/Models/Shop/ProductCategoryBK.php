<?php

namespace App\Models\Shop;

use App\Models\Model;
use Illuminate\Support\Collection;

class ProductCategoryBK extends Model
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

    public function getAllRelatedCategoryIds(): array
    {
        $ids = [$this->id]; // خود دسته

        // گرفتن همه والدها
        $category = $this;
        while ($category->parent_id) {
            $ids[] = $category->parent_id;
            $category = self::find($category->parent_id);
            if (! $category) {
                break;
            }
        }

        // گرفتن همه فرزندان
        $ids = array_merge($ids, $this->getAllChildrenIds());

        // حذف تکراری‌ها
        $ids = array_unique($ids);

        return $ids;
    }

    public function getAllParentIds(): array
    {
        $ids = [];
        $category = $this;

        while ($category->parent_id) {
            $ids[] = $category->parent_id;
            $category = self::find($category->parent_id);
            if (! $category) {
                break;
            }
        }

        return $ids;
    }

    public function getAllChildrenIds(): array
    {
        $ids = [$this->id]; // شامل خود دسته
        $children = self::where('parent_id', $this->id)->get();

        foreach ($children as $child) {
            $ids = array_merge($ids, $child->getAllChildrenIds());
        }

        return $ids;
    }

    public function getAllChildrenFilters(): Collection
    {
        $categoryIds = $this->getAllChildrenIds();

        return Filter::whereHas('productCategories', function ($query) use ($categoryIds) {
            $query->whereIn('product_category_id', $categoryIds);
        })->get();
    }

    public function getAllChildrenFiltersWithValues(): Collection
    {
        $categoryIds = $this->getAllChildrenIds();

        $productIds = Product::whereIn('product_category_id', $categoryIds)->pluck('id');

        $filters = Filter::whereHas('productCategories', function ($query) use ($categoryIds) {
            $query->whereIn('product_category_id', $categoryIds);
        })->with(['products' => function ($q) use ($productIds) {
            $q->whereIn('products.id', $productIds);
        }])->get();

        // ۵. اضافه کردن مجموعه‌ی valueهای منحصربه‌فرد به هر فیلتر
        $filters->map(function ($filter) {
            $filter->values = $filter->products->pluck('pivot.value')->unique()->values();
            unset($filter->products); // محصولات لازم نیست برگردن

            return $filter;
        });

        return $filters;
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class, 'id', 'product_category_id');
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
        return $this->hasOne(ProductCategoryBK::class, 'id', 'parent_id')->orderBy('sort');
    }

    public function children(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductCategoryBK::class, 'parent_id', 'id')->orderBy('sort');
    }

//    public static function tree(): \Illuminate\Database\Eloquent\Collection
//    {
//        return static::with(implode('.', array_fill(0, 100, 'children')))->where('parent_id', '=', '0')->orderBy('sort')->get();
//    }

    public static function tree(): \Illuminate\Database\Eloquent\Collection
    {
        return static::select(['id', 'title', 'slug'])
            ->with([
                'children' => function($query) {
                    $query->select(['id', 'title', 'slug', 'parent_id'])
                        ->with([
                            'children' => function($query) {
                                $query->select(['id', 'title', 'slug', 'parent_id']);
                            }
                        ]);
                }
            ])
            ->where('parent_id', 0)
            ->where('status', 1)
            ->orderBy('sort')
            ->get();
    }

    public static function flatTree($categories = null, $level = 0)
    {
        if ($categories === null) {
            $categories = static::tree(); // همون متد خودت
        }

        $result = collect();

        foreach ($categories as $cat) {
            $result->push([
                'value' => $cat->id,
                'label' => str_repeat('-', $level).' '.$cat->title,
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
            $tree[$category->id] = $st.$category->name;
            if (! empty($categories[$category->id])) {
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
