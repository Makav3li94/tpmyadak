<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Tax;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TaxController extends Controller
{
    #[Permission('view-tax')]
    public function index(Request $request)
    {
        $query = Tax::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }


        return inertia('admin/tax/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-tax')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        Tax::create($validatedData);

        return redirect()->route('admin.taxes.index')
            ->with('message', ['type' => 'success', 'message' => 'مالیات ساخته شد.']);
    }

    #[Permission('update-tax')]
    public function update(Request $request, Tax $tax) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $tax->update($validatedData);

        return redirect()->route('admin.taxes.index')
            ->with('message', ['type' => 'success', 'message' => 'مالیات ویرایش شد.']);
    }

    #[Permission('delete-tax')]
    public function destroy(Tax $tax) : RedirectResponse
    {
        $tax->delete();
        return redirect()->route('admin.taxes.index')
            ->with('message', ['type' => 'success', 'message' => 'مالیات حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:125',
            'value' => 'required|numeric|max:100|min:0',
        ]);
    }
}
