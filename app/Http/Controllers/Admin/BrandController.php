<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Brand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    #[Permission('view-brand')]
    public function index(Request $request)
    {
        $query = Brand::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/brand/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-brand')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        Brand::create($validatedData);

        return redirect()->route('admin.brands.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ساخته شد.']);
    }

    #[Permission('update-brand')]
    public function update(Request $request, Brand $brand) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $brand->update($validatedData);

        return redirect()->route('admin.brands.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ویرایش شد.']);
    }

    #[Permission('delete-brand')]
    public function destroy(Brand $brand) : RedirectResponse
    {
        $brand->delete();
        return redirect()->route('admin.brands.index')
            ->with('message', ['type' => 'success', 'message' => 'برند حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:125',
            'alias' => 'nullable|string|max:120',
            'slug' => 'nullable|string|max:125',
            'image' => 'nullable|string|max:255',
            'url' => 'nullable|url|max:100',
            'status' => 'nullable|boolean',
        ]);
        $validatedData ['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $validatedData ['alias'] = empty($request->alias) ? Str::limit($request->title, 110) : Str::slug($request->alias);
        return $validatedData;
    }
}
