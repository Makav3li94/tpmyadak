<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Supplier;
use App\Rules\IranPhoneValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SupplierController extends Controller
{
    #[Permission('view-supplier')]
    public function index(Request $request)
    {
        $query = Supplier::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/supplier/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-supplier')]
    public function store(Request $request)
    {
        $validatedData = $this->validateRequest($request);
        Supplier::create($validatedData);

        return redirect()->route('admin.suppliers.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ساخته شد.']);
    }

    #[Permission('update-supplier')]
    public function update(Request $request, Supplier $supplier) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $supplier->update($validatedData);

        return redirect()->route('admin.suppliers.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ویرایش شد.']);
    }

    #[Permission('delete-supplier')]
    public function destroy(Supplier $supplier) : RedirectResponse
    {
        $supplier->delete();
        return redirect()->route('admin.suppliers.index')
            ->with('message', ['type' => 'success', 'message' => 'برند حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:125',
            'alias' => 'nullable|string|max:120',
            'email' => 'nullable|email|max:120',
            'phone' => ['nullable',new IranPhoneValidator()],
            'slug' => 'nullable|string|max:125',
            'image' => 'nullable|string|max:255',
            'url' => 'nullable|url|max:100',
            'address' => 'nullable|string',
            'status' => 'nullable|boolean',
        ]);
        $validatedData ['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $validatedData ['alias'] = empty($request->alias) ? Str::limit($request->title, 110) : Str::slug($request->alias);
        return $validatedData;
    }
}
