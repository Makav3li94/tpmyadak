<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;

class ProfileController extends Controller
{
    public function edit(string $id)
    {
        $user = User::find($id);
        return inertia('user/profile/form', [
            'user' => $user,
        ]);
    }

    public function update(User $user)
    {
        return 'profile-update';
    }
}
