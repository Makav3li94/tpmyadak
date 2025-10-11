<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\CarBrand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CarBrandController extends Controller
{
    #[Permission('view-car-brand')]
    public function index(Request $request)
    {
        $query = CarBrand::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/car-brand/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-car-brand')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        CarBrand::create($validatedData);

        return redirect()->route('admin.car.brands.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ساخته شد.']);
    }

    #[Permission('update-car-brand')]
    public function update(Request $request, CarBrand $carBrand) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $carBrand->update($validatedData);

        return redirect()->route('admin.car.brands.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ویرایش شد.']);
    }

    #[Permission('delete-car-brand')]
    public function destroy(CarBrand $carBrand) : RedirectResponse
    {
        $carBrand->delete();
        return redirect()->route('admin.car.brands.index')
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
            'slug' => 'nullable|string|max:125',
        ]);
        $validatedData ['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        return $validatedData;
    }
}
