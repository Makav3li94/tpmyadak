<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\PaymentMethod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    #[Permission('view-payment-method')]
    public function index(Request $request)
    {
        $query = PaymentMethod::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }


        return inertia('admin/payment-method/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-payment-method')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        PaymentMethod::create($validatedData);

        return redirect()->route('admin.payment.methods.index')
            ->with('message', ['type' => 'success', 'message' => 'متد ارسال ساخته شد.']);
    }

    #[Permission('update-payment-method')]
    public function update(Request $request, PaymentMethod $paymentMethod) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $paymentMethod->update($validatedData);

        return redirect()->route('admin.payment.methods.index')
            ->with('message', ['type' => 'success', 'message' => 'متد ارسال ویرایش شد.']);
    }

    #[Permission('delete-payment-method')]
    public function destroy(PaymentMethod $paymentMethod) : RedirectResponse
    {
        $paymentMethod->delete();
        return redirect()->route('admin.payment.methods.index')
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
//            'cost' => 'required|numeric|min:0',
        ]);
    }
}
