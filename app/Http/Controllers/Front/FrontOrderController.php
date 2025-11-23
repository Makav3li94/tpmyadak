<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Shop\Address;
use App\Models\Shop\Discount;
use App\Models\Shop\Order;
use App\Models\Shop\OrderDetail;
use App\Models\Shop\PaymentMethod;
use App\Models\Shop\Product;
use App\Models\Shop\ShippingMethod;
use App\Models\Shop\Transaction;
use App\Models\Traits\SmsableMokhaberat;
use App\Rules\IranMobileValidator;
use App\Rules\IranPhoneValidator;
use App\Rules\IranPostalCodeValidator;
use App\Rules\MeliCodeValidator;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Exceptions\PurchaseFailedException;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;

class FrontOrderController extends Controller
{
    use SmsableMokhaberat;

    public function cart()
    {
        return inertia('main/order/cart');
    }

    // FrontOrderController.php
    public function refreshCart(Request $request)
    {
        $cartItems = $request->input('items'); // [{id, quantity}]
        $updated = [];

        foreach ($cartItems as $item) {
            $product = Product::find($item['id']);
            if (! $product) {
                continue;
            }

            $updated[] = [
                'id' => $item['id'],
                'price' => $product->price,
                'discount' => $product->discount,
                'quantity' => $item['quantity'],
                'total' => $product->discount
                    ? ($product->discount * $item['quantity'])
                    : ($product->price * $item['quantity']),
            ];
        }

        return response()->json($updated);
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
        $user = auth()->user();

        // ----- 1. بررسی قیمت و موجودی محصولات -----
        $updatedItems = [];
        $subtotal = 0;
        $discountTotal = 0;

        foreach ($request->items as $item) {
            $product = Product::find($item['id']);
            if (! $product) {
                return back()->withErrors(['error' => "محصول {$item['title']} موجود نیست."]);
            }

            if ($product->stock < $item['quantity']) {
                return back()->withErrors(['error' => "موجودی محصول {$product->title} کافی نیست."]);
            }

            $price = (int) $product->price;
            $discount = (int) ($product->discount ?? 0);

            $itemTotal = $price * $item['quantity'] - $discount * $item['quantity'];
            $subtotal += $price * $item['quantity'];
            $discountTotal += $discount * $item['quantity'];

            $updatedItems[] = [
                'id' => $product->id,
                'title' => $product->title,
                'price' => $price,
                'discount' => $discount,
                'quantity' => $item['quantity'],
                'itemTotal' => $itemTotal,
            ];
        }

        // ----- 2. بررسی و اعمال تخفیف کد -----
        $extraDiscount = 0;
        if (! empty($request->discount_id)) {
            $dis = Discount::where('status', 1)
                ->whereIn('id', [$user->id, 0])
                ->whereDate('active_at', '<=', now())
                ->whereDate('expire_at', '>=', now())
                ->find($request->discount_id);

            if ($dis) {
                $dis->increment('max_time');
                $extraDiscount = (int) $dis->max_minus;
            }
        }

        // ----- 3. محاسبه جمع نهایی -----
        $cost = $subtotal - $discountTotal - $extraDiscount;

        // ----- 4. دریافت اطلاعات آدرس، ارسال و پرداخت -----
        $shippingMethod = ShippingMethod::find($request->shipping_method_id);
        $paymentMethod = PaymentMethod::find($request->payment_method_id);
        $address = Address::find($request->address_id);

        // ----- 5. ایجاد سفارش -----
        $order = Order::create([
            'user_id' => $user->id,
            'address_id' => $address->id,
            'shipping' => (int) $shippingMethod->cost,
            'shipping_method_id' => $shippingMethod->id,
            'payment_method_id' => $paymentMethod->id,
            'subtotal' => $subtotal,
            'discount' => $discountTotal + $extraDiscount,
            'tax' => 0,
            'other_fee' => 0,
            'total' => $cost + (int) $shippingMethod->cost,
            'name' => $address->name,
            'postal_code' => $address->postal_code,
            'mobile' => $address->mobile,
            'phone' => $address->phone,
            'address' => $address->address,
            'payment_method' => $paymentMethod->title,
            'shipping_method' => $shippingMethod->title,
            'status' => 'new',
        ]);

        // ----- 6. ذخیره جزئیات سفارش -----
        foreach ($updatedItems as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'title' => $item['title'],
                'amount' => $item['price'],
                'discount' => $item['discount'],
                'unit' => $item['quantity'],
                'total_price' => $item['itemTotal'],
                'tax' => 0,
                'attribute' => '-',
            ]);

            // کاهش موجودی محصول
            $product = Product::find($item['id']);

        }

        // ----- 7. نوتیفیکیشن ادمین (غیر همزمان) -----
        defer(fn () => notifyAdmin($user->id, $user->name, $user->mobile, 'order', $order->id, 1, 'سفارش خرید ثبت شد.'));

        // ----- 8. پرداخت Zarinpal -----
        $invoice = new Invoice;
        $invoice->detail('mobile', $user->mobile);
        $invoice->detail('email', $user->email);
        $invoice->amount($cost + (int) $shippingMethod->cost);
        $invoice->via('zarinpal');

        try {
            $payment = Payment::callbackUrl(route('home.check_payment', $order->id))
                ->purchase($invoice, function ($driver, $transactionId) use ($user, $order, $cost, $shippingMethod) {
                    $tx = Transaction::create([
                        'transaction_id' => $transactionId,
                        'user_id' => $user->id,
                        'order_id' => $order->id,
                        'price' => $cost + (int) $shippingMethod->cost,
                        'status' => '0',
                        'type' => 'order',
                    ]);
                    $order->update(['transaction_id' => $tx->id]);
                });

            $res = json_decode($payment->pay()->toJson(), true);

            return Inertia::location($res['action']);
        } catch (PurchaseFailedException $exception) {
            return response(['status' => 'NOK', 'message' => $exception->getMessage()]);
        }
    }

    public function checkPayment(Request $request)
    {
        $transaction = Transaction::where('order_id', $request->order_id)->first();
        if (! $transaction) {
            abort(419);
        }

        $order = Order::findOrFail($request->order_id);
        $user = auth()->user();

        try {
            // پرداخت موفق
            $receipt = Payment::amount((int) $transaction->price)
                ->transactionId($transaction->transaction_id)
                ->verify();

            $verify_code = $receipt->getReferenceId();

            // بروزرسانی تراکنش
            $transaction->update([
                'status' => '1',
                'verify_code' => $verify_code,
            ]);

            // بروزرسانی سفارش
            $order->update([
                'payment_status' => 'paid',
                'status' => 'paid',
            ]);

            /* 🔥 کاهش موجودی محصولات بعد از پرداخت موفق */
            foreach ($order->details as $detail) {
                $product = Product::find($detail->product_id);

                if ($product) {
                    // اگر موجودی کافی نداشته باشد → محصول ناموجود شده
                    if ($product->stock < $detail->unit) {
                        // بک‌آپ: جلوگیری از ثبت اشتباه
                        $product->update(['stock' => 0]);
                    } else {
                        $product->decrement('stock', $detail->unit);
                    }
                }
            }

            $message = 'پرداخت موفق';

            // ارسال پیام و نوتیفای
            defer(fn () => $this->sendFastSmsMokhaberat(
                $user->mobile,
                '9a4xncmdrci65g1',
                ['name' => $user->name, 'order' => "{$transaction->id}"]
            ));

            defer(fn () => notifyAdmin(
                $user->id,
                $user->name,
                $user->mobile,
                'tx',
                $order->id,
                1,
                'سفارش خرید پرداخت شد.'
            ));

        } catch (InvalidPaymentException $exception) {

            $message = $exception->getMessage();
            $verify_code = 0;

            // سفارش در حالت معلق
            $order->update([
                'payment_status' => 'failed',
                'status' => 'hold',
            ]);
        }

        return inertia('main/order/check-payment', [
            'order' => $order,
            'message' => $message,
            'verify_code' => $verify_code,
        ]);
    }

    public function discount(Request $request, $code)
    {
        $request['code'] = $code;
        $request->validate(['code' => 'required|string|max:10']);
        $discount = Discount::where([['status', 1], ['code', $request['code']]])->whereDate('active_at', '<=', Carbon::today())->whereDate('expire_at', '>=', Carbon::today())->first();

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
