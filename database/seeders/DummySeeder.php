<?php

namespace Database\Seeders;

use App\Models\Shop\AttributeGroup;
use App\Models\Shop\Brand;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\Filter;
use App\Models\Shop\PaymentMethod;
use App\Models\Shop\ProductCategory;
use App\Models\Shop\ShippingMethod;
use App\Models\Shop\Supplier;
use App\Models\Shop\Tax;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Brand::create([
            'title' => 'گیلان',
            'slug' => Str::slug('گیلان'),
            'image' => 'c13e4ef32a1547a7a581f35d62bba8eb__thumb=300x300.jpeg',
        ]);
        Brand::create([
            'title' => 'عظام',
            'slug' => Str::slug('عظام'),
            'image' => 'Brands-Logo-Ezam.jpg',
        ]);
        Brand::create([
            'title' => 'سوخت آما',
            'slug' => Str::slug('سوخت آما'),
            'image' => 'Logo-sookhtama-Retina.png',
        ]);
        Brand::create([
            'title' => 'ایران کاربراتور',
            'slug' => Str::slug('ایران کاربراتور'),
            'image' => '8d414109-c18e-4128-92f5-33dfc68b79e1.webp',
        ]);
        Brand::create([
            'title' => 'سکو',
            'slug' => Str::slug('سکو'),
            'image' => 'seco.png',
        ]);
        Brand::create([
            'title' => 'لیزر',
            'slug' => Str::slug('لیزر'),
            'image' => 'a7bc68a1d4624030910118524e076169__image=400x300,300x225,200x150,100x100,100x75,65x65,155x155,600x600,300x400,75x75,300x300,160x160.jpg',
        ]);
        Brand::create([
            'title' => 'آترود',
            'slug' => Str::slug('آترود'),
            'image' => 'd36c5e90-fc9a-40ad-8cce-a9b457623cfb.webp',
        ]);

        Supplier::create([
            'title' => 'ایران خودرو',
            'slug' => Str::slug('ایران خودرو'),
            'image' => 'Iran-Khodro-logo.png',
        ]);
        Supplier::create([
            'title' => 'سایپا',
            'slug' => Str::slug('سایپا'),
            'image' => 'Saipa-logo.png',
        ]);
        Supplier::create([
            'title' => 'TPM',
            'slug' => Str::slug('TPM'),
            'image' => '7vFIZB5WjGodKSBe9hy1mPKpSK06yb0nNm3vjN7f.png',
        ]);

        $cb1 = CarBrand::create([
            'title' => 'پژو',
            'slug' => Str::slug('پژو'),
        ]);
        $cb2 = CarBrand::create([
            'title' => 'پراید',
            'slug' => Str::slug('پراید'),
        ]);
        CarModel::create([
            'title' => '206',
            'slug' => Str::slug('206'),
            'car_brand_id' => $cb1->id,
        ]);
        CarModel::create([
            'title' => '207',
            'slug' => Str::slug('207'),
            'car_brand_id' => $cb1->id,
        ]);
        CarModel::create([
            'title' => '405',
            'slug' => Str::slug('405'),
            'car_brand_id' => $cb1->id,
        ]);
        CarModel::create([
            'title' => 'پارس',
            'slug' => Str::slug('پارس'),
            'car_brand_id' => $cb1->id,
        ]);
        CarModel::create([
            'title' => '131',
            'slug' => Str::slug('131'),
            'car_brand_id' => $cb2->id,
        ]);
        CarModel::create([
            'title' => '132',
            'slug' => Str::slug('132'),
            'car_brand_id' => $cb2->id,
        ]);
        CarModel::create([
            'title' => '133',
            'slug' => Str::slug('133'),
            'car_brand_id' => $cb2->id,
        ]);

        AttributeGroup::create([
            'title' => 'رنگ',
            'type' => 'select',
            'status' => 1,
        ]);
        AttributeGroup::create([
            'title' => 'وزن',
            'type' => 'select',
            'status' => 1,
        ]);

        Filter::create(['title' => 'ابعاد']);

        $bc1 = ProductCategory::create([
            'title' => 'موتور',
            'slug' => 'موتور',
            'status' => true,
        ]);
        $bc2 = ProductCategory::create([
            'title' => 'جلوبندی',
            'slug' => 'جلوبندی',
            'status' => true,
        ]);
        $bc3 = ProductCategory::create([
            'title' => 'روغن',
            'slug' => 'روغن',
            'status' => true,
        ]);
        $bcc1 = ProductCategory::create([
            'title' => 'روغن موتور',
            'slug' => 'روغن-موتور',
            'parent_id' => $bc3->id,
            'status' => true,
        ]);
        $bccc1 = ProductCategory::create([
            'title' => 'روغن موتور خودرو',
            'slug' => 'روغن-موتور-خودرو',
            'parent_id' => $bcc1->id,
            'status' => true,
        ]);
        $f1 = Filter::create(['title' => 'فن آوری ساخت']);
        $f2 = Filter::create(['title' => 'سطح کیفیت']);
        $f3 = Filter::create(['title' => 'گرانروی']);
        $bccc1->filters()->attach([$f1->id, $f2->id, $f3->id]);
        $bcc2 = ProductCategory::create([
            'title' => 'روغن ترمز',
            'slug' => 'روغن-ترمز',
            'parent_id' => $bc3->id,
            'status' => true,
        ]);
        $f4 = Filter::create(['title' => 'استاندارد روغن']);
        $f5 = Filter::create(['title' => 'حجم']);
        $bcc2->filters()->attach([$f4->id, $f5->id]);
        $bcc3 = ProductCategory::create([
            'title' => 'گیریس',
            'slug' => 'گیریس',
            'parent_id' => $bc3->id,
            'status' => true,
        ]);
        $f6 = Filter::create(['title' => 'محدوده نفوذ']);
        $bcc3->filters()->attach([$f6->id]);
        ProductCategory::create([
            'title' => 'تسمه تایم',
            'slug' => 'تسمه-تایم',
            'parent_id' => $bc1->id,
            'status' => true,
        ]);
        ProductCategory::create([
            'title' => 'بلبرینگ',
            'slug' => 'بلبرینگ',
            'parent_id' => $bc1->id,
            'status' => true,
        ]);
        ProductCategory::create([
            'title' => 'کمک فنر',
            'slug' => 'کمک-فنر',
            'parent_id' => $bc2->id,
            'status' => true,
        ]);
        ProductCategory::create([
            'title' => 'پلوس',
            'slug' => 'پلوس',
            'parent_id' => $bc2->id,
            'status' => true,
        ]);
        ProductCategory::create([
            'title' => 'جعبه فرمان',
            'slug' => 'جعبه-فرمان',
            'parent_id' => $bc2->id,
            'status' => true,
        ]);

        Tax::create(['title' => 'ارزش افزوده', 'value' => '10']);
        Tax::create(['title' => 'بدون مالیات', 'value' => '0']);

        PaymentMethod::create(['title' => 'درگاه']);
        PaymentMethod::create(['title' => 'قسطی']);

        ShippingMethod::create(['title' => 'پست', 'cost' => '150000']);
        ShippingMethod::create(['title' => 'تیپاکس', 'cost' => '200000']);
    }
}
