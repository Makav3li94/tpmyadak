<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\CarType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CarTypeController extends Controller
{
    #[Permission('view-car-type')]
    public function index(Request $request)
    {
        $query = CarType::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/car-type/index', [
            'data' => $query->with('carModel:id,title')->paginate(10),
        ]);
    }

    #[Permission('create-car-type')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        CarType::create($validatedData);

        return redirect()->route('admin.car.types.index')
            ->with('message', ['type' => 'success', 'message' => 'تایپ خودرو ساخته شد.']);
    }

    #[Permission('update-car-type')]
    public function update(Request $request, CarType $carType): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $carType->update($validatedData);

        return redirect()->route('admin.car.types.index')
            ->with('message', ['type' => 'success', 'message' => 'تایپ خودرو ویرایش شد.']);
    }

    #[Permission('delete-car-type')]
    public function destroy(CarType $carType): RedirectResponse
    {
        $carType->delete();

        return redirect()->route('admin.car.types.index')
            ->with('message', ['type' => 'success', 'message' => 'تایپ خودرو حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:125',
            'slug' => 'nullable|string|max:125',
            'car_model_id' => 'required|ulid',
        ]);
        $validatedData['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);

        return $validatedData;
    }
}
