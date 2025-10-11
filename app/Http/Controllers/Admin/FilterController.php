<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\Filter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FilterController extends Controller
{
    #[Permission('view-filter')]
    public function index(Request $request)
    {
        $query = Filter::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }


        return inertia('admin/filter/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-filter')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        Filter::create($validatedData);

        return redirect()->route('admin.filters.index')
            ->with('message', ['type' => 'success', 'message' => 'فیلتر ساخته شد.']);
    }

    #[Permission('update-filter')]
    public function update(Request $request, Filter $filter) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $filter->update($validatedData);

        return redirect()->route('admin.filters.index')
            ->with('message', ['type' => 'success', 'message' => 'فیلتر ویرایش شد.']);
    }

    #[Permission('delete-filter')]
    public function destroy(Filter $filter) : RedirectResponse
    {
        $filter->delete();
        return redirect()->route('admin.taxes.index')
            ->with('message', ['type' => 'success', 'message' => 'فیلتر حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:125',
        ]);
    }
}
