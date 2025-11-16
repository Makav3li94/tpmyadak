<?php

namespace App\Http\Middleware;

use App\Constants\MenuConstant;
use App\Models\Setting;
use App\Services\UserJwtService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    //    protected $rootView = 'admin';
    public function rootView(Request $request): string
    {
        $prefix = explode('/', $request->route()->uri);
        if ($prefix[0] === 'tpmauto') {
            return 'admin';
        }
        //        if ($prefix[0] === 'user') {
        //            return 'user';
        //        }

        return 'app';
    }

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (auth()->guard('admin')->check()) {
            return array_merge(parent::share($request), [
                'auth' => [
                    'user' => $request->user() ? $request->user()->load(['role.permissions']) : $request->user(),
                    'login_at' => Session::get('user_login_at', ''),
                    'jwt_token' => UserJwtService::getActiveToken(),
                    'jwt_prefix' => UserJwtService::KEYPREFIX,
                ],
                'flash' => [
                    'message' => fn () => Session::get('message'),
                    'data' => fn () => Session::get('data'),
                ],
                'app' => Setting::getByKeys(['app_name', 'app_logo']),
                'notification_count' => $request->user() ? $request->user()->unreadNotifications()->count() : 0,
                'notifications' => $request->user() ? $request->user()->unreadNotifications()->get() : [],
                'navigation' => MenuConstant::handle($request->user()),
            ]);
        }
        //        elseif ($user = auth()->user()) {}
        else {
            return array_merge(parent::share($request), [
                'auth' => [
                    'user' => $request->user(),
                    'login_at' => Session::get('user_login_at', ''),
                    'jwt_token' => UserJwtService::getActiveToken(),
                    'jwt_prefix' => UserJwtService::KEYPREFIX,
                ],
                'flash' => [
                    'message' => fn () => Session::get('message'),
                    'data' => fn () => Session::get('data'),
                ],
                'app' => Setting::getByKeys(['app_name', 'app_logo']),
                'notification_count' => $request->user() ? $request->user()->unreadNotifications()->count() : 0,
            ]);
        }

    }
}
