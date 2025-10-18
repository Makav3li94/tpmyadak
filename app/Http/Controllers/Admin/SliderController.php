<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Brand;
use App\Models\Slider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SliderController extends Controller
{
    #[Permission('view-slider')]
    public function index(Request $request)
    {
        $sliders=Slider::all();

        return inertia('admin/slider/index', [
            'sliders' => $sliders,
        ]);

    }

    #[Permission('create-slider')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        slider::create($validatedData);

        return redirect()->route('admin.sliders.index')
            ->with('message', ['type' => 'success', 'message' => 'اسلایدر ساخته شد.']);
    }

    #[Permission('update-slider')]
    public function update(Request $request, Slider $slider) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $slider->update($validatedData);

        return redirect()->route('admin.sliders.index')
            ->with('message', ['type' => 'success', 'message' => 'اسلایدر ویرایش شد.']);
    }

    #[Permission('delete-slider')]
    public function destroy(Slider $slider) : RedirectResponse
    {
        $slider->delete();
        return redirect()->route('admin.sliders.index')
            ->with('message', ['type' => 'success', 'message' => 'اسلایدر حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'image' => 'nullable|string|max:255',
            'url' => 'nullable|url|max:100',
            'status' => 'nullable|boolean',
        ]);
        $validatedData ['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $validatedData ['alias'] = empty($request->alias) ? Str::limit($request->title, 110) : Str::slug($request->alias);
        return $validatedData;
    }
}
