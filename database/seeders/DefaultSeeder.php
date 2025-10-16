<?php

namespace Database\Seeders;

use App\Constants\PermissionConstant;
use App\Constants\SettingConstant;
use App\Models\Admin;
use App\Models\BlogCategory;
use App\Models\Familiarity;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Shop\Brand;
use App\Models\Shop\ProductCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (SettingConstant::all() as $setting) {
            Setting::insert(['id' => Str::ulid(), ...$setting]);
        }

        foreach (PermissionConstant::all() as $permission) {
            Permission::insert(['id' => Str::ulid(), ...$permission]);
        }

        $role = Role::create(['name' => 'admin']);

        $permissions = Permission::all();
        foreach ($permissions as $permission) {
            $role->rolePermissions()->create(['permission_id' => $permission->id]);
        }

        Admin::create([
            'name' => 'Super Administrator',
            'email' => 'root@admin.com',
            'password' => bcrypt('password'),
        ]);

        Admin::create([
            'name' => 'Administator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $role->id,
        ]);
        User::create([
            'name' => 'john doe',
            'email' => 'john@doe.com',
            'mobile' => '09121234567',
            'password' => bcrypt('password'),
        ]);


        BlogCategory::create([
            'title' => 'مجله',
            'slug' => 'مجله',
            'status' => true,
        ]);

        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Familiarity::truncate();
        for ($i = 1; $i < 8; $i++) {
            switch ($i) {
                case 1:
                    Familiarity::create([
                        'title' => 'موتورهای جستجوگر',
                    ]);
                    break;
                case 2:
                    Familiarity::create([
                        'title' => 'شبکه های اجتماعی',
                    ]);
                    break;
                case 3:
                    Familiarity::create([
                        'title' => 'دوستان و آشنایان',
                    ]);
                    break;
                case 4:
                    Familiarity::create([
                        'title' => 'تبلیغات بنری',
                    ]);
                    break;
                case 5:
                    Familiarity::create([
                        'title' => 'پیامک مارکتینگ',
                    ]);
                    break;
                case 6:
                    Familiarity::create([
                        'title' => 'ایمیل مارکتینگ',
                    ]);
                    break;
                case 7:
                    Familiarity::create([
                        'title' => 'مشتریان قبلی ما',
                    ]);
                    break;
            }
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}
