<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Shop\Address;
use App\Models\Shop\Discount;
use App\Models\Shop\PaymentMethod;
use App\Models\Shop\ShippingMethod;
use App\Rules\IranMobileValidator;
use App\Rules\IranPhoneValidator;
use App\Rules\IranPostalCodeValidator;
use App\Rules\MeliCodeValidator;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FrontOrderController extends Controller
{
    public function cart()
    {
        return inertia('main/order/cart');
    }

    public function checkout()
    {
        $user = auth()->user();
        $paymentMethods = PaymentMethod::all();
        $shippingMethods = ShippingMethod::all();

        return inertia('main/order/checkout', [
            'user' => $user->load('addresses'),
            'paymentMethods' => $paymentMethods,
            'shippingMethods' => $shippingMethods,
        ]);
    }

    public function address(Request $request): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        Address::create($validatedData);

        return redirect()->back()->with('message', ['type' => 'success', 'message' => 'آدرس ساخته شد.']);
    }

    public function order(Request $request)
    {
        return $request->all();
    }

    public function discount(Request $request, $code)
    {
        $request['code'] = $code;
        $request->validate(['code' => 'required|string|max:10']);
        $discount = Discount::where([['is_active', 'active'], ['code', $request['code']]])->whereDate('active_at', '<=', Carbon::today())->whereDate('expire_at', '>=', Carbon::today())->first();

        if ($discount) {
            if ($discount->max_time + 1 > $discount->max_limit) {
                return response(['status' => 'error', 'discount' => false], 201);
            }

            return response(['status' => 'success', 'discount' => $discount]);
        }

        return response(['status' => 'error', 'discount' => false], 201);
    }

    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'user_id' => 'required|ulid',
            'name' => 'required|string|max:100',
            'postal_code' => ['required', new IranPostalCodeValidator],
            'm_code' => ['required', new MeliCodeValidator],
            'mobile' => ['required', new IranMobileValidator],
            'phone' => ['required', new IranPhoneValidator],
            'address' => 'required|string|max:1000',
        ]);
    }
}
