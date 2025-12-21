<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Filter;
use App\Models\Shop\Product;
use App\Models\Shop\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Pagination\LengthAwarePaginator;


class ProductCategoryController extends Controller
{
    #[Permission('view-product-category')]
    public function index(Request $request)
    {
        // ---------------------------------------------
        // 1️⃣ خواندن تمام دسته‌ها با parent
        // ---------------------------------------------
        $query = ProductCategory::query()->with('parent');

        if ($request->q) {
            $query->where('title', 'like', "%{$request->q}%");
        }

        $allCategories = $query->orderBy('sort')->get();

        // ---------------------------------------------
        // 2️⃣ ساختن درخت دسته‌ها
        // ---------------------------------------------
        $tree = ProductCategory::buildTree($allCategories);

        // ---------------------------------------------
        // 3️⃣ flatten کردن درخت با level
        // ---------------------------------------------
        $flatCategories = [];
        $addToFlat = function ($nodes, $level = 0) use (&$flatCategories, &$addToFlat) {
            foreach ($nodes as $node) {
                $node->level = $level; // ذخیره level برای فرانت
                $flatCategories[] = $node;
                if ($node->children->isNotEmpty()) {
                    $addToFlat($node->children, $level + 1);
                }
            }
        };
        $addToFlat($tree);

        // ---------------------------------------------
        // 4️⃣ اضافه کردن تعداد محصولات شامل زیر دسته‌ها
        // ---------------------------------------------
        foreach ($flatCategories as $category) {
            $allCategoryIds = $category->getAllChildrenIds();
            $category->totalProductsCount = Product::whereIn('product_category_id', $allCategoryIds)->count();
        }

        // ---------------------------------------------
        // 5️⃣ pagination Collection
        // ---------------------------------------------
        $perPage = 10;
        $page = $request->get('page', 1);
        $items = collect($flatCategories);

        $paginated = new LengthAwarePaginator(
            $items->forPage($page, $perPage),
            $items->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        // ---------------------------------------------
        // 6️⃣ ارسال داده به Inertia
        // ---------------------------------------------
        return inertia('admin/product-category/index', [
            'paginated' => $paginated->toArray(),
        ]);
    }


    #[Permission('create-product-category')]
    public function create()
    {
        $filters = Filter::select('id', 'title')->get()->map(function ($item) {
            return [
                'value' => strval($item['id']),
                'label' => $item['title'],
            ];
        })->values()->toArray();

        return inertia('admin/product-category/form', [
            'filters' => $filters,
        ]);
    }

    #[Permission('create-product-category')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $validatedData['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $filterArray = $request['filter_array'];
        unset($validatedData['filter_array']);
        $productCategory = ProductCategory::create($validatedData);
        if (count($filterArray)) {
            $productCategory->filters()->attach(array_mapper($filterArray));
        }

        return redirect()->route('admin.product.categories.index')
            ->with('message', ['type' => 'success', 'message' => 'دسته ساخته شد.']);
    }

    #[Permission('update-product-category')]
    public function edit(ProductCategory $productCategory)
    {
        $filters = Filter::select('id', 'title')->get()->map(function ($item) {
            return [
                'value' => strval($item['id']),
                'label' => $item['title'],
            ];
        })->values()->toArray();
        $productCategory['def_filters'] = array_labeler($productCategory->filters);

        return inertia('admin/product-category/form', [
            'productCategory' => $productCategory->load('parent'),
            'filters' => $filters,
        ]);
    }

    #[Permission('update-product-category')]
    public function update(Request $request, ProductCategory $productCategory)
    {

        $validatedData = $this->validateRequest($request);
        $validatedData['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $filterArray = $request['filter_array'];
        unset($validatedData['filter_array']);
        $productCategory->update($validatedData);
        $productCategory->filters()->sync(array_mapper($filterArray));

        return redirect()->route('admin.product.categories.index')
            ->with('message', ['type' => 'success', 'message' => 'دسته به روز شد.']);
    }

    #[Permission('delete-product-category')]
    public function destroy(ProductCategory $productCategory): RedirectResponse
    {
        $productCategory->delete();

        return redirect()->route('admin.product.categories.index')
            ->with('message', ['type' => 'success', 'message' => 'Iدسته حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'parent_id' => 'nullable',
            'status' => 'nullable|boolean',
        ]);

        return $validatedData;
    }
}
