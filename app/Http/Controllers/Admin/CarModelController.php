<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\CarModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CarModelController extends Controller
{
    #[Permission('view-car-model')]
    public function index(Request $request)
    {
        $query = CarModel::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/car-model/index', [
            'data' => $query->with('carBrand:id,title')->paginate(10),
        ]);
    }

    #[Permission('create-car-model')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        CarModel::create($validatedData);

        return redirect()->route('admin.car.models.index')
            ->with('message', ['type' => 'success', 'message' => 'مدل خودرو ساخته شد.']);
    }

    #[Permission('update-car-model')]
    public function update(Request $request, CarModel $carModel): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $carModel->update($validatedData);

        return redirect()->route('admin.car.models.index')
            ->with('message', ['type' => 'success', 'message' => 'مدل خودرو ویرایش شد.']);
    }

    #[Permission('delete-car-model')]
    public function destroy(CarModel $carModel): RedirectResponse
    {
        $carModel->delete();

        return redirect()->route('admin.car.models.index')
            ->with('message', ['type' => 'success', 'message' => 'مدل خودرو حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:125',
            'slug' => 'nullable|string|max:125',
            'car_brand_id' => 'required|ulid',
        ]);
        $validatedData['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);

        return $validatedData;
    }
}
