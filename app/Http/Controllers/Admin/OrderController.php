<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Order;
use App\Rules\IranMobileValidator;
use App\Rules\IranPhoneValidator;
use App\Rules\IranPostalCodeValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class OrderController extends Controller
{
    #[Permission('view-order')]
    public function index(Request $request): Response
    {
        $query = Order::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/order/index', [
            'data' => $query->with(['user'])->paginate(10),
        ]);
    }

    #[Permission('create-order')]
    public function create(): Response
    {
        return inertia('admin/order/form', [
        ]);
    }

    #[Permission('create-order')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->handleValidate($request);
        $order = Order::create($validatedData);

        return redirect()->route('admin.orders.show', $order->id)
            ->with('message', ['type' => 'success', 'message' => 'سفارش با موفقیت ساخته شد.']);
    }

    #[Permission('update-order')]
    public function show(Order $order): Response
    {
        return inertia('admin/order/show', [
            'order' => $order->load(['details', 'details.product:id,price,title,minimum', 'user', 'shippingMethod', 'paymentMethod']),
        ]);
    }

    #[Permission('update-order')]
    public function update(Request $request, Order $order): RedirectResponse
    {
        $validatedData = $this->handleValidate($request, 'update');

        $order->fill($validatedData);

        $order->save();

        return redirect()->route('admin.orders.index')
            ->with('message', ['type' => 'success', 'message' => 'سفارش با موفقیت ویرایش شد.']);
    }

    #[Permission('delete-order')]
    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('message', ['type' => 'success', 'message' => 'سفارش با موفقیت حذف شد.']);
    }

    private function handleValidate(Request $request, $type = 'store'): array
    {
        $defaultValidationArray = [
            'user_id' => 'required|ulid',
            'address_id' => 'required|ulid',
            'payment_method_id' => 'required|ulid',
            'shipping_method_id' => 'required|ulid',
            'note' => 'nullable|string',
            'name' => 'required|string',
            'postal_code' => ['required', new IranPostalCodeValidator],
            'mobile' => ['required', new IranMobileValidator],
            'phone' => ['required', new IranPhoneValidator],
            'status' => 'required|in:new,pending,hold,verify,processing,done,canceled,refunded',
        ];
        $conRules = [];
        if ($type == 'update') {
            $conRules = [
                'address_id' => 'required|ulid',
                'discount' => 'nullable|numeric',
                'other_fee' => 'nullable|numeric',
                'shipping' => 'nullable|numeric',
                'subtotal' => 'nullable|numeric',
                'tax' => 'nullable|numeric',
                'total' => 'nullable|numeric',
            ];
        } else {
            $conRules = [
                'order_address' => 'required|string',
            ];
        }
        $rules = array_merge($defaultValidationArray, $conRules);
        $validatedData = $request->validate($rules);

        if ($type == 'update') {
            $validatedData['total'] = $validatedData['subtotal'] + $validatedData['other_fee'] + $validatedData['shipping'] + $validatedData['tax'] - $validatedData['discount'];
        } else {
            $validatedData['address'] = $validatedData['order_address'];
            unset($validatedData['order_address']);
        }

        return $validatedData;
    }
}
