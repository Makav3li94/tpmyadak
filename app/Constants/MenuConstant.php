<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class MenuConstant
{
    public static function all()
    {
        $menu = [
            [
                'name' => 'داشبورد',
                'show' => true,
                'icon' => 'MonitorDot',
                'route' => route('admin.dashboard'),
                'active' => 'admin.dashboard',
                'permission' => 'view-dashboard',
            ],
            [
                'name' => 'مشتریان',
                'show' => true,
                'icon' => 'UserRoundCog',
                'route' => route('admin.users.index'),
                'active' => 'admin.users.index',
                'permission' => 'view-dashboard',
            ],
            [
                'name' => 'فروش',
                'show' => true,
                'icon' => 'ShoppingCart',
                'items' => [
                    [
                        'name' => 'سفارشات',
                        'show' => true,
                        'route' => route('admin.orders.index'),
                        'active' => 'admin.orders.*',
                        'permission' => 'view-order',
                    ],
                    [
                        'name' => 'تراکنش ها',
                        'show' => true,
                        'route' => route('admin.transactions.index'),
                        'active' => 'admin.transactions.*',
                        'permission' => 'view-transaction',
                    ],
                ],
            ],
            [
                'name' => 'محصولات',
                'show' => true,
                'icon' => 'Kanban',
                'items' => [
                    [
                        'name' => 'محصولات',
                        'show' => true,
                        'route' => route('admin.products.index'),
                        'active' => 'admin.products.*',
                        'permission' => 'view-product',
                    ],
                    [
                        'name' => 'دسته بندی',
                        'show' => true,
                        'route' => route('admin.product.categories.index'),
                        'active' => 'admin.product.categories.*',
                        'permission' => 'view-product-category',
                    ],

                    [
                        'name' => 'تامین کننده ها',
                        'show' => true,
                        'route' => route('admin.suppliers.index'),
                        'active' => 'admin.suppliers.*',
                        'permission' => 'view-supplier',
                    ],

                ],
            ],
            [
                'name' => 'لیبل ها',
                'show' => true,
                'icon' => 'Car',
                'items' => [
                    [
                        'name' => 'برند ها',
                        'show' => true,
                        'route' => route('admin.brands.index'),
                        'active' => 'admin.brands.*',
                        'permission' => 'view-brand',
                    ],
                    [
                        'name' => 'برند خودرو',
                        'show' => true,
                        'route' => route('admin.car.brands.index'),
                        'active' => 'admin.car.brands.*',
                        'permission' => 'view-car-brand',
                    ],
                    [
                        'name' => 'مدل خودرو',
                        'show' => true,
                        'route' => route('admin.car.models.index'),
                        'active' => 'admin.car.models.*',
                        'permission' => 'view-car-model',
                    ],

                ],
            ],
            [
                'name' => 'فروشگاه',
                'show' => true,
                'icon' => 'Store',
                'items' => [
                    [
                        'name' => 'گروه ویژگی',
                        'show' => true,
                        'route' => route('admin.attribute.groups.index'),
                        'active' => 'admin.attribute.groups.*',
                        'permission' => 'view-attribute-group',
                    ],
                    [
                        'name' => 'فیلتر دسته',
                        'show' => true,
                        'route' => route('admin.filters.index'),
                        'active' => 'admin.filters.*',
                        'permission' => 'view-filter',
                    ],
                    [
                        'name' => 'مالیات',
                        'show' => true,
                        'route' => route('admin.taxes.index'),
                        'active' => 'admin.taxes.*',
                        'permission' => 'view-tax',
                    ],
                    [
                        'name' => 'متد ارسال',
                        'show' => true,
                        'route' => route('admin.shipping.methods.index'),
                        'active' => 'admin.shipping.methods.*',
                        'permission' => 'view-shipping-method',
                    ],
                    [
                        'name' => 'متد پرداخت',
                        'show' => true,
                        'route' => route('admin.payment.methods.index'),
                        'active' => 'admin.payment.methods.*',
                        'permission' => 'view-payment-method',
                    ],
                    [
                        'name' => 'کد تخفیف',
                        'show' => true,
                        'route' => route('admin.discounts.index'),
                        'active' => 'admin.discounts.*',
                        'permission' => 'view-discount',
                    ],
                ],
            ],
            [
                'name' => 'مدیران',
                'show' => true,
                'icon' => 'ShieldUser',
                'items' => [
                    [
                        'name' => 'نقش ها',
                        'show' => true,
                        'route' => route('admin.roles.index'),
                        'active' => 'admin.roles.*',
                        'permission' => 'view-role',
                    ],
                    [
                        'name' => 'ادمین ها',
                        'show' => true,
                        'route' => route('admin.admins.index'),
                        'active' => 'admin.admins.index',
                        'permission' => 'view-admin',
                    ],
                ],
            ],
            [
                'name' => 'تنظیمات',
                'show' => true,
                'icon' => 'Cog',
                'items' => [
                    [
                        'name' => 'سایت',
                        'show' => true,
                        'route' => route('admin.setting.index'),
                        'active' => 'admin.setting.index',
                        'permission' => 'view-setting',
                    ],
                    [
                        'name' => 'اسلایدر',
                        'show' => true,
                        'route' => route('admin.sliders.index'),
                        'active' => 'admin.sliders.*',
                        'permission' => 'view-slider',
                    ],
                    [
                        'name' => 'بکاپ',
                        'show' => true,
                        'route' => route('admin.backup.index'),
                        'active' => 'admin.backup.index',
                        'permission' => 'view-setting',
                    ],
                    [
                        'name' => 'لاگ',
                        'show' => true,
                        'route' => route('admin.audit-logs.index'),
                        'active' => 'admin.audit-logs.index',
                        'permission' => 'view-setting',
                    ],
                    [
                        'name' => 'خطاها',
                        'show' => true,
                        'route' => route('admin.errlogs.index'),
                        'active' => 'admin.errlogs.index',
                        'permission' => 'view-setting',
                    ],
//                    [
//                        'name' => 'مدیا',
//                        'show' => true,
//                        'route' => route('files.index'),
//                        'active' => 'files.index',
//                        'permission' => 'view-setting',
//                    ],
                ],
            ],

            // # Add Generated Menu Here!
            [
                'name' => 'وبلاگ',
                'show' => true,
                'icon' => 'TableOfContents',
                'items' => [
                    [
                        'name' => 'دسته بندی',
                        'show' => true,
                        'route' => route('admin.blog.categories.index'),
                        'active' => 'admin.blog.categories.*',
                        'permission' => 'view-blog-category',
                    ],
                    [
                        'name' => 'پست ها',
                        'show' => true,
                        'route' => route('admin.blogs.index'),
                        'active' => 'admin.blogs.*',
                        'permission' => 'view-blog',
                    ],
                ],
            ],
            [
                'name' => 'پشتیبانی',
                'show' => true,
                'icon' => 'TicketCheck',
                'route' => route('admin.tickets.index'),
                'active' => 'admin.tickets.*',
                'permission' => 'view-ticket',
            ],
            ];

//        if (Route::has('admin.shortlink.link.index')) {
//            $menu = array_merge(
//                $menu,
//                [[
//                    'name' => 'شورتلینک',
//                    'show' => true,
//                    'icon' => 'Globe',
//                    'route' => route('admin.shortlink.link.index'),
//                    'active' => 'admin.shortlink.link.*',
//                    'permission' => 'view-shortlink',
//                ]],
//            );
//        }
//
//        if (Route::has('custom-form.forms.index')) {
//            $menu = array_merge($menu, [[
//                'name' => 'فرم کاستوم',
//                'show' => true,
//                'icon' => 'FormInput',
//                'route' => route('custom-form.forms.index'),
//                'active' => 'custom-form.forms.*',
//                'permission' => 'view-custom-form',
//            ]]);
//        }

        return $menu;
    }

    public static function handle()
    {
        return self::all();
    }
}
