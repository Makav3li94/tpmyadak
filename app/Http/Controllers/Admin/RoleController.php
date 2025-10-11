<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission as AttributesPermission;
use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class RoleController extends Controller
{
    #[AttributesPermission('view-role')]
    public function index(Request $request): Response
    {
        $request->user()->allow('view-role', true);

        $query = Role::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/role/index', [
            'data' => $query->paginate(),
        ]);
    }

    #[AttributesPermission('create-role')]
    public function create(): Response
    {
        return inertia('admin/role/form', [
            'permissions' => Permission::all()
                ->groupBy('group')
                ->toArray(),
        ]);
    }

    #[AttributesPermission('create-role')]
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'string|required|max:255',
            'permissions' => 'array|required',
            'permissions.*.id' => 'ulid|required|exists:permissions,id',
        ]);

        DB::beginTransaction();
        $role = Role::create(['name' => $request->name]);
        foreach ($request->permissions as $permission) {
            RolePermission::create([
                'role_id' => $role->id,
                'permission_id' => $permission['id'],
            ]);
        }
        DB::commit();

        return redirect()->route('admin.roles.index')
            ->with('message', ['type' => 'success', 'message' => 'ایتم با موفقیت ساخته شد.']);
    }

    #[AttributesPermission('update-role')]
    public function edit(Role $role): Response
    {
        return inertia('admin/role/form', [
            'role' => $role->load(['permissions']),
            'permissions' => Permission::all()
                ->groupBy('group')
                ->toArray(),
        ]);
    }

    #[AttributesPermission('update-role')]
    public function update(Request $request, Role $role): RedirectResponse
    {
        $request->validate([
            'name' => 'string|required|max:255',
            'permissions' => 'array|required',
            'permissions.*.id' => 'ulid|required|exists:permissions,id',
        ]);

        if ($role->flag == 1) {
            return redirect()->route('admin.roles.index')
                ->with('message', ['type' => 'error', 'message' => 'Item default can\'t updated']);
        }

        DB::beginTransaction();
        $role->update([
            'name' => $request->name,
        ]);

        RolePermission::where('role_id', $role->id)->delete();

        foreach ($request->permissions as $permission) {
            RolePermission::create([
                'role_id' => $role->id,
                'permission_id' => $permission['id'],
            ]);
        }
        DB::commit();

        return redirect()->route('admin.roles.index')
            ->with('message', ['type' => 'success', 'message' => 'ایتم با موفقیت ویرایش شد.']);
    }

    #[AttributesPermission('delete-role')]
    public function destroy(Role $role): RedirectResponse
    {
        $deleted = $role->delete();

        if ($deleted) {
            return redirect()->route('admin.roles.index')
                ->with('message', ['type' => 'success', 'message' => 'ایتم با موفقیت حذف شد.']);
        }

        return redirect()->route('admin.roles.index')
            ->with('message', ['type' => 'success', 'message' => 'ایتم قابل حذف نیست.']);
    }
}
