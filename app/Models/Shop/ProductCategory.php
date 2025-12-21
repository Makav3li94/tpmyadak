<?php

namespace App\Models\Shop;

use App\Models\Model;
use Illuminate\Support\Collection;

/**
 * Class ProductCategory
 *
 * Optimized tree and traversal helpers: minimize DB queries, build in-memory maps,
 * and use iterative traversals for flat listing and getting descendants/ancestors.
 */
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

    /**
     * Corrected hasMany relationship: product_category_id is the FK in products table.
     */
    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class, 'product_category_id', 'id');
    }

    public function filters(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Filter::class, 'filter_product_categories');
    }

    public function parent(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ProductCategory::class, 'id', 'parent_id')->orderBy('sort');
    }

    public function children(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductCategory::class, 'parent_id', 'id')->orderBy('sort');
    }

    /**
     * Build a nested tree of categories from a flat collection.
     *
     * Fetches all categories in one query (if $allCategories is null) and builds the nested tree
     * using an in-memory parent->children map (O(n)).
     *
     * @param  Collection|null  $allCategories  optional pre-fetched categories collection
     * @param  int|string  $rootParentId  the parent id considered root (default 0)
     * @return Collection nested tree (each node is a Category model with ->children set)
     */
    public static function buildTree(?Collection $allCategories = null, $rootParentId = 0): Collection
    {
        $all = $allCategories ?? static::select(['id', 'parent_id', 'title', 'slug', 'status', 'sort'])->orderBy('sort')->get();

        // Build lookup map parent_id => [children...]
        $map = [];
        foreach ($all as $cat) {
            $pid = $cat->parent_id ?? 0;
            $map[$pid][] = $cat;
        }

        // Use a recursive closure that uses the map (no DB queries)
        $build = function ($parentId) use (&$map, &$build) {
            $nodes = collect();
            foreach ($map[$parentId] ?? [] as $child) {
                // clone or set children collection on the model for convenience
                $child->setRelation('children', $build($child->id));
                $nodes->push($child);
            }

            return $nodes;
        };

        return $build($rootParentId);
    }

    /**
     * Return a flattened list of categories suitable for select controls.
     * This is optimized: it fetches categories only once and then iteratively
     * produces an ordered flattened list with level prefixes.
     *
     * @param  Collection|null  $categories  optional pre-fetched nested categories (from buildTree)
     * @param  int|string  $rootParentId
     * @param  string  $prefixChar  character used to indicate levels ('-' by default)
     * @return Collection of arrays: ['value' => id, 'label' => prefixed title]
     */
    public static function flatTree(?Collection $categories = null, $rootParentId = 0, $prefixChar = '-'): Collection
    {
        // If nested categories are not provided, build them fast from a single query.
        if ($categories === null) {
            $categories = static::buildTree(null, $rootParentId);
        }

        $result = collect();

        // Use an explicit stack for DFS: each entry is [node, level]
        $stack = [];
        // We'll push in reverse order so the original order is preserved when popping
        $children = $categories->reverse();
        foreach ($children as $node) {
            $stack[] = [$node, 0];
        }

        while (! empty($stack)) {
            [$node, $level] = array_pop($stack);

            $label = ($level > 0 ? str_repeat($prefixChar, $level).' ' : '').$node->title;
            $result->push([
                'value' => $node->id,
                'label' => $label,
            ]);

            // If node has children, push them onto the stack in reverse order
            $nodeChildren = $node->children ?? collect();
            if ($nodeChildren->isNotEmpty()) {
                foreach ($nodeChildren->reverse() as $child) {
                    $stack[] = [$child, $level + 1];
                }
            }
        }

        return $result;
    }

    /**
     * Get all children ids (descendants) including the current category id.
     * This version fetches all categories once and walks the children map in memory.
     *
     * @param  Collection|null  $allCategories  optional pre-fetched categories collection
     */
    public function getAllChildrenIds(?Collection $allCategories = null): array
    {
        $all = $allCategories ?? static::select(['id', 'parent_id'])->get();

        // build map parent_id => children ids
        $map = [];
        foreach ($all as $cat) {
            $pid = $cat->parent_id ?? 0;
            $map[$pid][] = $cat->id;
        }

        $ids = [];
        $stack = [$this->id];

        while (! empty($stack)) {
            $current = array_pop($stack);
            if (! in_array($current, $ids, true)) {
                $ids[] = $current;
                foreach ($map[$current] ?? [] as $childId) {
                    $stack[] = $childId;
                }
            }
        }

        return $ids;
    }

    /**
     * Get all parent ids (ancestors) up to the root.
     * Uses an in-memory lookup map for O(depth) complexity and single DB fetch when needed.
     *
     * @param  Collection|null  $allCategories  optional pre-fetched categories collection
     * @return array ancestor ids (closest parent first)
     */
    public function getAllParentIds(?Collection $allCategories = null): array
    {
        $all = $allCategories ?? static::select(['id', 'parent_id'])->get();

        // build lookup id => parent_id
        $parentMap = [];
        foreach ($all as $cat) {
            $parentMap[$cat->id] = $cat->parent_id;
        }

        $ids = [];
        $currentParent = $parentMap[$this->id] ?? null;

        while ($currentParent && ! in_array($currentParent, $ids, true)) {
            $ids[] = $currentParent;
            $currentParent = $parentMap[$currentParent] ?? null;
        }

        return $ids;
    }

    /**
     * Get all related category ids (ancestors + descendants + self).
     * Combines getAllChildrenIds and getAllParentIds efficiently by single-fetching all categories.
     *
     * @return array unique ids
     */
    public function getAllRelatedCategoryIds(): array
    {
        // Pre-fetch all categories once to be shared by both operations
        $all = static::select(['id', 'parent_id'])->get();

        $children = $this->getAllChildrenIds($all);
        $parents = $this->getAllParentIds($all);

        $ids = array_values(array_unique(array_merge($children, $parents)));

        return $ids;
    }

    /**
     * Returns filters belonging to all children (descendants) categories,
     * implemented via single-query category id collection + eager filter lookup.
     */
    public function getAllChildrenFilters(): Collection
    {
        $categoryIds = $this->getAllChildrenIds();

        // Use a single query with whereHas to find related filters
        return Filter::whereHas('productCategories', function ($query) use ($categoryIds) {
            $query->whereIn('product_category_id', $categoryIds);
        })->get();
    }

    /**
     * Return filters with values aggregated from products within this category subtree.
     * Efficiently preloads product ids in subtree, then eager loads filter->products constrained to those products.
     */
    public function getAllChildrenFiltersWithValues(): Collection
    {
        $categoryIds = $this->getAllChildrenIds();

        $productIds = Product::whereIn('product_category_id', $categoryIds)->pluck('id');

        $filters = Filter::whereHas('productCategories', function ($query) use ($categoryIds) {
            $query->whereIn('product_category_id', $categoryIds);
        })->with(['products' => function ($q) use ($productIds) {
            $q->whereIn('products.id', $productIds);
        }])->get();

        // Add unique pivot values for each filter and remove products relation to reduce payload
        $filters->map(function ($filter) {
            $filter->values = $filter->products->pluck('pivot.value')->unique()->values();
            $filter->unsetRelation('products');

            return $filter;
        });

        return $filters;
    }

    public static function tree(): \Illuminate\Database\Eloquent\Collection
    {
        return static::select(['id', 'title', 'slug'])
            ->with([
                'children' => function ($query) {
                    $query->select(['id', 'title', 'slug', 'parent_id'])
                        ->with([
                            'children' => function ($query) {
                                $query->select(['id', 'title', 'slug', 'parent_id']);
                            },
                        ]);
                },
            ])
            ->where('parent_id', 0)
            ->where('status', 1)
            ->orderBy('sort')
            ->get();
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

    public function getCategoriesFull(): Collection
    {
        $listFullCategory = $this->get()->groupBy('parent');

        return $listFullCategory;
    }

    public function getAncestors(?Collection $allCategories = null): Collection
    {
        $all = $allCategories ?? static::select(['id', 'parent_id', 'title', 'slug'])->get();
        $parentMap = $all->keyBy('id');

        $ancestors = collect();
        $currentParentId = $this->parent_id;

        while ($currentParentId && isset($parentMap[$currentParentId])) {
            $parent = $parentMap[$currentParentId];
            $ancestors->prepend($parent); // از ریشه به پایین
            $currentParentId = $parent->parent_id;
        }

        return $ancestors;
    }

    public function totalProductsCount(): int
    {
        // تعداد محصولات خودش و تمام زیر دسته‌ها
        $allCategoryIds = $this->getAllChildrenIds(); // شامل خودش
        return \App\Models\Shop\Product::whereIn('product_category_id', $allCategoryIds)->count();
    }
}
