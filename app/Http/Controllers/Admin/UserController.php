<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\IranMobileValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use phpDocumentor\Reflection\Types\Null_;

class UserController extends Controller
{
    #[Permission('view-user')]
    public function index(Request $request): Response
    {
        $request->user()->allow('view-user', true);

        $query = User::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/user/index', [
            'data' => $query->paginate(),
        ]);
    }

    #[Permission('create-user')]
    public function create(): Response
    {
        return inertia('admin/user/form');
    }

    #[Permission('create-user')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->validateData($request);

        User::create($validatedData);

        return redirect()->route('admin.users.index')
            ->with('message', ['type' => 'success', 'message' => 'کاربر با موفقیت ساخته شد.']);
    }

    #[Permission('update-user')]
    public function edit(User $user): Response
    {
        return inertia('admin/user/form', [
            'user' => $user->load(['addresses', 'familiarity'])
        ]);
    }

    #[Permission('update-user')]
    public function update(Request $request, User $user): RedirectResponse
    {
        $validatedData = $this->validateData($request, 'update', $user->id);

        $user->fill($validatedData);

        if ($request->password != '') {
            $user->password = bcrypt($request->password);
        }

        $user->save();

        return redirect()->route('admin.users.index')
            ->with('message', ['type' => 'success', 'message' => 'کاربر با موفقیت ویرایش شد.']);
    }

    #[Permission('delete-user')]
    public function destroy(User $user): RedirectResponse
    {

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('message', ['type' => 'success', 'message' => 'کاربر با موفقیت حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateData(Request $request, $type = 'store', $id = NULL): array
    {
        $defaultValidationArray = [
            'name' => 'required|string|max:255',
            'familiarity_id' => 'required|ulid',
            'status' => 'required|in:active,suspend,pending',
            'password' => 'nullable|string|max:255',
        ];
        if ($type == 'update') {
            $conRules = [
                'email' => 'required|email|unique:users,email,' . $id,
                'mobile' => ['required',new IranMobileValidator(),'unique:users,mobile,' . $id],
            ];
        } else {
            $conRules = [
                'email' => 'required|email|unique:users,email',
                'mobile' => ['required',new IranMobileValidator(),'unique:users,mobile'],
            ];
        }
        $rules = array_merge($defaultValidationArray, $conRules);
        return $request->validate($rules);

    }
}
