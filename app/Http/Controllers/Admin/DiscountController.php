<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Discount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    #[Permission('view-discount')]
    public function index(Request $request)
    {
        $query = Discount::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/discount/index', [
            'data' => $query->with('user', 'productCategory')->paginate(10),
        ]);
    }

    #[Permission('create-discount')]
    public function store(Request $request)
    {
        $validatedData = $this->validateRequest($request);
        Discount::create($validatedData);

        return redirect()->route('admin.discounts.index')
            ->with('message', ['type' => 'success', 'message' => 'کدتخفیف ساخته شد.']);
    }

    #[Permission('update-discount')]
    public function update(Request $request, Discount $discount): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $discount->update($validatedData);

        return redirect()->route('admin.discounts.index')
            ->with('message', ['type' => 'success', 'message' => 'کدتخفیف ویرایش شد.']);
    }

    #[Permission('delete-discount')]
    public function destroy(Discount $discount): RedirectResponse
    {
        $discount->delete();

        return redirect()->route('admin.discounts.index')
            ->with('message', ['type' => 'success', 'message' => 'کدتخفیف حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:125',
            'user_id' => 'nullable|ulid',
            'product_category_id' => 'nullable|ulid',
            'code' => 'required|string|max:125',
            'percentage' => 'required|numeric|max:100',
            'max_limit' => 'required|numeric',
            'max_minus' => 'required|numeric',
            'active_at' => 'required|date',
            'expire_at' => 'required|date',
            'status' => 'required|boolean',
        ]);
    }
}
