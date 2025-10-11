<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\ShippingMethod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ShippingMethodController extends Controller
{
    #[Permission('view-shipping-method')]
    public function index(Request $request)
    {
        $query = ShippingMethod::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }


        return inertia('admin/shipping-method/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-shipping-method')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        ShippingMethod::create($validatedData);

        return redirect()->route('admin.shipping.methods.index')
            ->with('message', ['type' => 'success', 'message' => 'متد ارسال ساخته شد.']);
    }

    #[Permission('update-shipping-method')]
    public function update(Request $request, ShippingMethod $shippingMethod) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $shippingMethod->update($validatedData);

        return redirect()->route('admin.shipping.methods.index')
            ->with('message', ['type' => 'success', 'message' => 'متد ارسال ویرایش شد.']);
    }

    #[Permission('delete-shipping-method')]
    public function destroy(ShippingMethod $shippingMethod) : RedirectResponse
    {
        $shippingMethod->delete();
        return redirect()->route('admin.shipping.methods.index')
            ->with('message', ['type' => 'success', 'message' => 'متد ارسال حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:125',
            'cost' => 'required|numeric|min:0',
        ]);
    }
}
