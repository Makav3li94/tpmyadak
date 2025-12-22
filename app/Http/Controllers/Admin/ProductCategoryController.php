<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Filter;
use App\Models\Shop\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    #[Permission('view-product-category')]
    public function index(Request $request): Response
    {
        $query = ProductCategory::query();
        $query->with('parent');
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/product-category/index', [
            'data' => $query->paginate(10),
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
        return $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'parent_id' => 'nullable',
            'status' => 'nullable|boolean',
        ]);
    }
}
