<?php

namespace Database\Seeders;

use App\Constants\PermissionConstant;
use App\Constants\SettingConstant;
use App\Models\Admin;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Familiarity;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Slider;
use App\Models\User;
use Carbon\Carbon;
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

        $bc = BlogCategory::create([
            'title' => 'مجله',
            'slug' => 'مجله',
            'status' => true,
        ]);
        $bcc1 = BlogCategory::create([
            'title' => 'مقالات',
            'slug' => 'مقالات',
            'parent_id' => $bc->id,
            'status' => true,
        ]);
        Blog::create([
            'title' => 'آماده سازی خودرو برای زمستان',
            'slug' => Str::slug('آماده سازی خودرو برای زمستان'),
            'img_cover' => '1.jpg',
            'category_id' => $bc->id,
            'subcategory_id' => $bcc1->id,
            'published_at' => Carbon::now()->toDateTimeString(),
            'excerpt' => 'آماده‌ سازی خودرو برای زمستان یکی از مهم‌ ترین وظایف هر راننده‌ ای است که می‌ خواهد با خیال آسوده در فصل سرما رانندگی کند',
            'body' => 'آماده‌ سازی خودرو برای زمستان یکی از مهم‌ ترین وظایف هر راننده‌ ای است که می‌ خواهد با خیال آسوده در فصل سرما رانندگی کند. با نزدیک شدن به روزهای سرد و یخبندان، شرایط جاده‌ ها به طور قابل توجهی تغییر می‌ کند و این تغییرات نیازمند تدابیر ویژه‌ ای است.

از انتخاب لاستیک‌ های مناسب زمستانی گرفته تا بررسی سیستم گرمایشی و تهویه، همه جزئیاتی هستند که می‌ توانند تفاوت بزرگی در تجربه رانندگی شما ایجاد کنند. در این مقاله، به بررسی نکات و توصیه‌ های کاربردی برای آماده‌ سازی خودرو برای فصل زمستان می‌ پردازیم تا شما بتوانید با خرید لوازم یدکی خودرو مناسب و رعابت نکات ایمنی، اطمینان خاطر بیشتری در زمستان رانندگی کنید.',
            'status' => 1
        ]);
        Blog::create([
            'title' => 'تفاوت بنزین سوپر و معمولی',
            'slug' => Str::slug('تفاوت بنزین سوپر و معمولی'),
            'img_cover' => '1.jpg',
            'category_id' => $bc->id,
            'subcategory_id' => $bcc1->id,
            'published_at' => Carbon::now()->toDateTimeString(),
            'excerpt' => 'تفاوت بنزین سوپر و معمولی یکی از مسائل مهمی است که هر راننده‌ ای باید با آن آشنا باشد.',
            'body' => 'تفاوت بنزین سوپر و معمولی یکی از مسائل مهمی است که هر راننده‌ ای باید با آن آشنا باشد. آیا بنزین سوپر با عدد اکتان بنزین بالاتر واقعا می‌ تواند عملکرد و کارایی خودروی شما را بهبود بخشد؟ یا اینکه بنزین معمولی با قیمت کمتر همان کارایی را ارائه می‌ دهد؟ این تصمیم می‌ تواند تاثیرات مهمی بر عمر موتور، کارایی خودرو و حتی هزینه‌ های روزانه شما داشته باشد.

اگر شما هم مانند بسیاری از رانندگان، درباره انتخاب بهترین سوخت برای خودرویتان کنجکاو هستید، این مقاله را از دست ندهید. در ادامه، به بررسی دقیق تفاوت‌ ها و مزایای هر نوع بنزین می‌ پردازیم تا بتوانید با آگاهی کامل، بهترین تصمیم را برای خودروی خود بگیرید.',
            'status' => 1

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

        Slider::create([
            'image' => 'bannerSlide01.jpg',
            'status' => 1,
        ]);
        Slider::create([
            'image' => 'bannerSlider02.jpg',
            'status' => 1,
        ]);
        Slider::create([
            'image' => 'bannerSlider03.jpg',
            'status' => 1,
        ]);
    }
}
