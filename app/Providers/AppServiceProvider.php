<?php

namespace App\Providers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\Setting;
use App\Models\User;
use App\Observers\GlobalActivityLogger;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(125);
        Vite::prefetch(concurrency: 3);

        User::observe(GlobalActivityLogger::class);
        Role::observe(GlobalActivityLogger::class);
        Permission::observe(GlobalActivityLogger::class);
        Setting::observe(GlobalActivityLogger::class);
        RedirectIfAuthenticated::redirectUsing(function () {
            return auth()->guard('admin')->check() ? route('admin.dashboard') : route('user.dashboard');
        });
        if (env('LOG_SQL_ENABLE', false)) {
            DB::listen(function ($query) {
                Log::info(
                    $query->sql,
                    [
                        'bindings' => $query->bindings,
                        'time' => $query->time,
                        'connectionName' => $query->connectionName,
                    ]
                );
            });
        }
    }
}
