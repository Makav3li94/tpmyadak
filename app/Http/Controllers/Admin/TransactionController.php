<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    #[Permission('view-transaction')]
    public function index(Request $request)
    {
        $query = Transaction::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/transaction/index', [
            'data' => $query->with(['user:id,name', 'order:id'])->paginate(10),
        ]);
    }

    #[Permission('create-transaction')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        Transaction::create($validatedData);

        return redirect()->route('admin.transactions.index')
            ->with('message', ['type' => 'success', 'message' => 'تراکنش ساخته شد.']);
    }

    #[Permission('update-transaction')]
    public function update(Request $request, Transaction $transaction): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $transaction->update($validatedData);

        return redirect()->route('admin.transactions.index')
            ->with('message', ['type' => 'success', 'message' => 'تراکنش ویرایش شد.']);
    }

    #[Permission('delete-transaction')]
    public function destroy(Transaction $transaction): RedirectResponse
    {
        $transaction->delete();

        return redirect()->route('admin.transactions.index')
            ->with('message', ['type' => 'success', 'message' => 'تراکنش حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'user_id' => 'required|ulid',
            'order_id' => 'required|ulid',
            'price' => 'required|numeric',
            //            'type' => 'nullable|in:order',
            'status' => 'nullable|boolean',
        ]);
        $validatedData['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $validatedData['alias'] = empty($request->alias) ? Str::limit($request->title, 110) : Str::slug($request->alias);

        return $validatedData;
    }
}
