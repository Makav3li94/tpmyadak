<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Shop\AttributeGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AttributeGroupController extends Controller
{
    #[Permission('view-attribute-group')]
    public function index(Request $request)
    {
        $query = AttributeGroup::query();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }


        return inertia('admin/attribute-group/index', [
            'data' => $query->paginate(10)
        ]);
    }



    #[Permission('create-attribute-group')]
    public function store(Request $request) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        AttributeGroup::create($validatedData);

        return redirect()->route('admin.attribute.groups.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ساخته شد.']);
    }

    #[Permission('update-attribute-group')]
    public function update(Request $request, AttributeGroup $attributeGroup) : RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $attributeGroup->update($validatedData);

        return redirect()->route('admin.attribute.groups.index')
            ->with('message', ['type' => 'success', 'message' => 'برند ویرایش شد.']);
    }

    #[Permission('delete-attribute-group')]
    public function destroy(AttributeGroup $attributeGroup) : RedirectResponse
    {
        $attributeGroup->delete();
        return redirect()->route('admin.attribute.groups.index')
            ->with('message', ['type' => 'success', 'message' => 'برند حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:125',
            'type' => 'nullable|in:radio,select,checkbox',
            'sort' => 'nullable',
            'status' => 'nullable|boolean',
        ]);
    }
}
