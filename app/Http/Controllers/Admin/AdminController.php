<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class AdminController extends Controller
{
    #[Permission('view-admin')]
    public function index(Request $request): Response
    {
        $request->user()->allow('view-admin', true);

        $query = Admin::query()
            ->with(['role']);
        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/admin/index', [
            'data' => $query->paginate(),
        ]);
    }

    #[Permission('create-admin')]
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|max:255',
            'role_id' => 'required|ulid|exists:roles,id',
        ]);

        Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id,
        ]);

        return redirect()->route('admin.admins.index')
            ->with('message', ['type' => 'success', 'message' => 'ادمین با موفقیت اضافه شد']);
    }

    #[Permission('update-admin')]
    public function update(Request $request, Admin $admin): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $admin->id,
            'password' => 'nullable|string|max:255',
        ]);

        if ($admin->role != null) {
            $request->validate([
                'role_id' => 'required|ulid|exists:roles,id',
            ]);
        }

        $admin->fill([
            'email' => $request->email,
            'name' => $request->name,
            'role_id' => $request->role_id,
        ]);

        if ($request->password != '') {
            $admin->password = bcrypt($request->password);
        }

        $admin->save();

        return redirect()->route('admin.admins.index')
            ->with('message', ['type' => 'success', 'message' => 'ادمین با موفقیت ویرایش شد']);
    }

    #[Permission('delete-admin')]
    public function destroy(Admin $admin): RedirectResponse
    {
        if ($admin->role_id == null) {
            return redirect()->route('admin.admins.index')
                ->with('message', ['type' => 'error', 'message' => 'قابل حذف نیست.']);
        }

        $admin->delete();

        return redirect()->route('admin.admins.index')
            ->with('message', ['type' => 'success', 'message' => 'ادمین با موفقیت حذف شد']);
    }
}
