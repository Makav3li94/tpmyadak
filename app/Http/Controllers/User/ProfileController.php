<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function edit(User $user)
    {
        return 'profile-edit';
    }

    public function update(User $user)
    {
        return 'profile-update';
    }
}
