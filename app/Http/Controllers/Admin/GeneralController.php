<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;


class GeneralController extends Controller
{
    public function index(Request $request)
    {
        return inertia('admin/dashboard', [
            'user_count' => User::count(),
            'role_count' => Role::count()
        ]);
    }

    public function maintance()
    {
        return inertia('maintance');
    }
}
