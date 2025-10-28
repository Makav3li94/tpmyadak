<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Shop\Address;
use App\Models\Shop\Discount;
use App\Models\Shop\Order;
use App\Models\Shop\OrderDetail;
use App\Models\Shop\PaymentMethod;
use App\Models\Shop\ShippingMethod;
use App\Models\Shop\Transaction;
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
        $user = auth()->user();
        if (!empty($request->discount)) {
            $dis = Discount::where([['is_active', 'active'], ['id', $request->discount]])
                ->whereIn('id', [$user->id, 0])->whereDate('active_at', '<=', Carbon::today())->whereDate('expire_at', '>=', Carbon::today())->first();
            $dis->increment('max_time');
            $discount = (int)$dis->max_minus;
        } else {
            $discount = 0;
        }
        $cost = (int)$request->total_cost - $discount;

        $shippingMethod = ShippingMethod::find($request->shipping_method_id);
        $paymentMethod = PaymentMethod::find($request->payment_method_id);
        $address = Address::find($request->address_id);
        $order = Order::create([
            'user_id' => $user->id,
            //                'dear_id'=>,
            'address_id' => $request->address_id,
            'shipping' => $shippingMethod->cost,
            'shipping_method_id' => $shippingMethod->id,
            'payment_method_id' => $paymentMethod->id,
            'subtotal' => $request->subtotal,
            'discount' => $request->discount,
            'tax' => 0,
            'other_fee' => 0,
            'total' => $cost,
            'name' => $address->name,
            'postal_code' => $address->postal_code,
            'mobile' => $address->mobile,
            'phone' => $address->phone,
            'address' => $address->address,
            'payment_method' => $paymentMethod->title,
            'shipping_method' => $shippingMethod->title,
            //            'payment_status' => 'unpaid',
            //            'shipping_status' => 'not_sent',
            'status' => 'new',

        ]);
        foreach ($request->items as $key => $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'title' => $item['title'],
                'amount' => (int)$item['price'],
                'discount' => (int)$item['discount'],
                'unit' => (int)$item['quantity'],
                'total_price' => (int)$item['itemTotal'],
                'tax' => 0,
                'attribute' => '-',
            ]);
        }
        //        defer(fn () => notifyAdmin($user->id, $user->name, $user->mobile, 'order', $parent_id, 0, 'سفارش خرید ثبت شد.'));
        $invoice = new Invoice;
        $invoice->detail('mobile', $user->mobile);
        $invoice->detail('email', $user->email);
        $invoice->amount($cost);
        $invoice->via('zarinpal');
        try {
            $payment = Payment::callbackUrl(route('home.check_payment', $order->id))
                ->purchase($invoice, function ($driver, $transactionId) use ($user, $order, $cost) {
                    $tx = Transaction::create([
                        'transaction_id' => $transactionId,
                        'user_id' => $user->id,
                        'order_id' => $order->id,
                        'price' => $cost,
                        'status' => '0',
                        'type' => 'order',
                    ]);
                    $order->update(['transaction_id' => $tx->id]);
                }
                );

            $res = json_decode($payment->pay()->toJson(), true);
            $method = 'GET';
            $action = $res['action'];
            $inputs = $res['inputs'];

            return Inertia::location($res['action']);
            //            return Inertia::render('Front/Finance/Redirect', ['method' => $method, 'action' => $action, 'inputs' => $inputs]);

            //            return response()->json(['status'=>'OK','method'=>'GET','action'=>$action,'inputs'=>$inputs]);

        } catch (PurchaseFailedException $exception) {
            echo $exception;

            return response(['status' => 'NOK']);
        }
    }

    public function checkPayment(Request $request)
    {
        $transaction = Transaction::where('order_id', $request->order_id)->first();
        if (!$transaction) {
            abort(419);
        }
        $order = Order::find($request->order_id);
        if (!$order) {
            abort(419);
        }

        try {
            $receipt = Payment::amount((int)$transaction->price)->transactionId($transaction->transaction_id)->verify();

            // You can show payment referenceId to the user.
            $verify_code = $receipt->getReferenceId();
            $transaction->update(['status' => '1', 'verify_code' => $verify_code]);
            $order->update(['payment_status' => 'paid']);
            $message = 'پرداخت موفت';
            //             defer(fn() => $this->sendFastSmsMokhaberat($user->mobile, '6z7rmgwyzp1ir8p', ["name" => $user->name, 'order' => "{$transaction->id}"]));
            //             defer(fn() => $this->notifyAdmin($user->id, $user->name, $user->mobile, 'order', $order->id, 1, 'سفارش خرید پرداخت شد.'));

        } catch (InvalidPaymentException $exception) {
            /**
             * when payment is not verified, it will throw an exception.
             * We can catch the exception to handle invalid payments.
             * getMessage method, returns a suitable message that can be used in user interface.
             **/
            $message = $exception->getMessage();
            $verify_code = 0;
            $order->update(['status' => 'hold']);
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
