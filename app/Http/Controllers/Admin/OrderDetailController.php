<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Address;
use App\Models\Shop\OrderDetail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    #[Permission('create-order')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        OrderDetail::create($validatedData);

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'محصول اضافه شد.']);
    }

    #[Permission('update-order')]
    public function update(Request $request, OrderDetail $orderDetail) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $orderDetail->update($validatedData);

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'سفارش ویرایش شد.']);
    }

    #[Permission('delete-order')]
    public function destroy(OrderDetail $orderDetail) : RedirectResponse
    {
        $orderDetail->delete();
        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'محصول حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'order_id' => 'required|ulid',
            'product_id' => 'required|ulid',
            'title' => 'required|string|max:150',
            'amount' => 'required|numeric',
            'discount' => 'required|numeric',
            'unit' => 'required|numeric',
            'total_price' => 'required|numeric',
            'tax' => 'required|numeric',
            'attribute' => 'nullable|string',
        ]);
    }
}
