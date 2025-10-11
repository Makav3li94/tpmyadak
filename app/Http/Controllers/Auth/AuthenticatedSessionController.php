<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('user/auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
//            'provider' => Inertia::optional(fn () => 'google'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();
        return Inertia::location(route('user.dashboard', absolute: false));
//        return redirect()->intended(route('dashboard', absolute: false));
    }



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        return Inertia::location(route('login', absolute: false));
//        return redirect()->route('login');
    }
}
