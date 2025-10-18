<?php

namespace Database\Seeders;

use App\Models\Shop\AttributeGroup;
use App\Models\Shop\Brand;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\Filter;
use App\Models\Shop\PaymentMethod;
use App\Models\Shop\Product;
use App\Models\Shop\ProductCategory;
use App\Models\Shop\ShippingMethod;
use App\Models\Shop\Supplier;
use App\Models\Shop\Tax;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $br1 = Brand::create([
            'title' => 'گیلان',
            'slug' => Str::slug('گیلان'),
            'image' => 'c13e4ef32a1547a7a581f35d62bba8eb__thumb=300x300.jpeg',
        ]);
        $bb2 = Brand::create([
            'title' => 'عظام',
            'slug' => Str::slug('عظام'),
            'image' => 'Brands-Logo-Ezam.jpg',
        ]);
        $bb3 = Brand::create([
            'title' => 'سوخت آما',
            'slug' => Str::slug('سوخت آما'),
            'image' => 'Logo-sookhtama-Retina.png',
        ]);
        $bb4 = Brand::create([
            'title' => 'ایران کاربراتور',
            'slug' => Str::slug('ایران کاربراتور'),
            'image' => '8d414109-c18e-4128-92f5-33dfc68b79e1.webp',
        ]);
        $bb5 = Brand::create([
            'title' => 'سکو',
            'slug' => Str::slug('سکو'),
            'image' => 'seco.png',
        ]);
        $bb6 = Brand::create([
            'title' => 'لیزر',
            'slug' => Str::slug('لیزر'),
            'image' => 'a7bc68a1d4624030910118524e076169__image=400x300,300x225,200x150,100x100,100x75,65x65,155x155,600x600,300x400,75x75,300x300,160x160.jpg',
        ]);
        Brand::create([
            'title' => 'آترود',
            'slug' => Str::slug('آترود'),
            'image' => 'd36c5e90-fc9a-40ad-8cce-a9b457623cfb.webp',
        ]);

        $spp1 = Supplier::create([
            'title' => 'ایران خودرو',
            'slug' => Str::slug('ایران خودرو'),
            'image' => 'Iran-Khodro-logo.png',
        ]);
        $spp2 = Supplier::create([
            'title' => 'سایپا',
            'slug' => Str::slug('سایپا'),
            'image' => 'Saipa-logo.png',
        ]);
        $spp3 = Supplier::create([
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
            'image' => 'cate1.jpg',
        ]);
        $bc2 = ProductCategory::create([
            'title' => 'جلوبندی',
            'slug' => 'جلوبندی',
            'status' => true,
            'image' => 'cate2.jpg',
        ]);
        $bc3 = ProductCategory::create([
            'title' => 'روغن',
            'slug' => 'روغن',
            'status' => true,
            'image' => 'cate3.jpg',
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
        $pp1 = ProductCategory::create([
            'title' => 'تسمه تایم',
            'slug' => 'تسمه-تایم',
            'parent_id' => $bc1->id,
            'status' => true,
        ]);
        $pp2 = ProductCategory::create([
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
        $pcp = ProductCategory::create([
            'title' => 'نظافت خارجی خودرو',
            'slug' => 'نظافت-خارجی-خودرو',
            'status' => true,
            'image' => 'cate4.jpg',
        ]);
        $tax1 = Tax::create(['title' => 'ارزش افزوده', 'value' => '10']);
        Tax::create(['title' => 'بدون مالیات', 'value' => '0']);

        PaymentMethod::create(['title' => 'درگاه']);
        PaymentMethod::create(['title' => 'قسطی']);

        ShippingMethod::create(['title' => 'پست', 'cost' => '150000']);
        ShippingMethod::create(['title' => 'تیپاکس', 'cost' => '200000']);
        Product::create([
            'title' => 'تسمه تایم هرینگتون Harrington مدل 801063 ',
            'slug' => Str::slug('تسمه تایم هرینگتون Harrington مدل 801063 '),
            'alias' => 'تسمه تایم هرینگتون Harrington مدل 801063 ',
            'excerpt' => 'تسمه تایم هرینگتون Harrington مدل 801063 برند: پاورگریپ اصلی',
            'product_category_id' => $pp1->id,
            'brand_id' => $br1->id,
            'supplier_id' => $spp1->id,
            'tax_id' => $tax1->id,
            'sku' => 'tpm-'.rand(11111, 99999),
            'minimum' => 1,
            'stock' => 1,
            'kind' => 0,
            'price' => 22650000,
            'about' => 'about text',
            'description' => 'about description',
            'image' => '5svCuVIKQDF4Kj6bSiDZHND1DDUAiZxfIhe2P7UJ2GIKtF64rt.jpg_512X512X70.webp',
            'status' => 1,
            'approve' => 1,
        ]);
        Product::create([
            'title' => 'بلبرینگ چرخ جلو ایساکو مدل 02702023 ',
            'slug' => Str::slug('بلبرینگ چرخ جلو ایساکو مدل 02702023 مناسب پژو 206 تیپ 2 ، تیپ 3 و صندوقدار V20'),
            'alias' => 'بلبرینگ چرخ جلو ایساکو مدل 02702023 مناسب پژو 206 تیپ 2 ، تیپ 3 و صندوقدار V20',
            'excerpt' => 'بلبرینگ چرخ جلو ایساکو مدل 02702023 مناسب پژو 206 تیپ 2 ، تیپ 3 و صندوقدار V20',
            'product_category_id' => $pp2->id,
            'brand_id' => $bb2->id,
            'supplier_id' => $spp1->id,
            'tax_id' => $tax1->id,
            'sku' => 'tpm-'.rand(11111, 99999),
            'minimum' => 1,
            'stock' => 1,
            'kind' => 0,
            'price' => 35050000,
            'about' => 'about text',
            'description' => 'about description',
            'image' => 'ROAD-WHEEL-206-FR-SNR-GB-40547.jpg',
            'status' => 1,
            'approve' => 1,
        ]);
        Product::create([
            'title' => 'روغن موتور خودرو کاسپین مدل',
            'slug' => Str::slug('روغن موتور خودرو کاسپین مدل MULTI GRADE 20W50 (چهار لیتری)'),
            'alias' => 'روغن موتور خودرو کاسپین مدل MULTI GRADE 20W50 (چهار لیتری)',
            'excerpt' => 'روغن موتور خودرو کاسپین مدل MULTI GRADE 20W50 (چهار لیتری)',
            'product_category_id' => $bccc1->id,
            'brand_id' => $bb3->id,
            'supplier_id' => $spp3->id,
            'tax_id' => $tax1->id,
            'sku' => 'tpm-'.rand(11111, 99999),
            'minimum' => 1,
            'stock' => 1,
            'kind' => 0,
            'price' => 35050000,
            'about' => 'about text',
            'description' => 'about description',
            'image' => 'b7c4b037654ab739004f312456bee84e.jpg',
            'status' => 1,
            'approve' => 1,
        ]);
        Product::create([
            'title' => 'روغن ترمز خودرو تکستار TEXTAR مدل DOT 4',
            'slug' => Str::slug('روغن ترمز خودرو تکستار TEXTAR مدل DOT 4'),
            'alias' => 'روغن ترمز خودرو تکستار TEXTAR مدل DOT 4',
            'excerpt' => 'روغن ترمز خودرو تکستار TEXTAR مدل DOT 4',
            'product_category_id' => $bcc2->id,
            'brand_id' => $bb4->id,
            'supplier_id' => $spp3->id,
            'tax_id' => $tax1->id,
            'sku' => 'tpm-'.rand(11111, 99999),
            'minimum' => 1,
            'stock' => 1,
            'kind' => 0,
            'price' => 150000,
            'about' => 'about text',
            'description' => 'about description',
            'image' => '00c325336815e03014adc4e275fb0d59df13151d_1698575784.jpg',
            'status' => 1,
            'approve' => 1,
        ]);
        Product::create([
            'title' => 'روغن گیربکس اتوماتیک خودرو لوکینی مدل CVT Fluid',
            'slug' => Str::slug('روغن گیربکس اتوماتیک خودرو لوکینی مدل CVT Fluid'),
            'alias' => 'روغن گیربکس اتوماتیک خودرو لوکینی مدل CVT Fluid',
            'excerpt' => 'روغن گیربکس اتوماتیک خودرو لوکینی مدل CVT Fluid',
            'product_category_id' => $bcc3->id,
            'brand_id' => $bb5->id,
            'supplier_id' => $spp2->id,
            'tax_id' => $tax1->id,
            'sku' => 'tpm-'.rand(11111, 99999),
            'minimum' => 1,
            'stock' => 1,
            'kind' => 0,
            'price' => 1850000,
            'discount' => '50000',
            'about' => 'about text',
            'description' => 'about description',
            'image' => 'xnplus-yellow-1.jpg',
            'status' => 1,
            'approve' => 1,
            'status_promotion' => 1,
            'date_start' => Carbon::now()->toDateTimeString(),
            'date_end' => Carbon::now()->addDays(25)->toDateTimeString(),
        ]);
        Product::create([
            'title' => 'اسپری رفع پنچری تایر گتسان GETSUN مدل Emergency TYRE WELD',
            'slug' => Str::slug('اسپری رفع پنچری تایر گتسان GETSUN مدل Emergency TYRE WELD'),
            'alias' => 'اسپری رفع پنچری تایر گتسان GETSUN مدل Emergency TYRE WELD',
            'excerpt' => 'اسپری رفع پنچری تایر گتسان GETSUN مدل Emergency TYRE WELD',
            'product_category_id' => $pcp->id,
            'brand_id' => $bb6->id,
            'supplier_id' => $spp3->id,
            'tax_id' => $tax1->id,
            'sku' => 'tpm-'.rand(11111, 99999),
            'minimum' => 1,
            'stock' => 1,
            'kind' => 0,
            'price' => 2450000,
            'discount' => '10000',
            'about' => 'about text',
            'description' => 'about description',
            'image' => 'AddText_03-06-03.49.55.webp',
            'status' => 1,
            'approve' => 1,
            'status_promotion' => 1,
            'date_start' => Carbon::now()->toDateTimeString(),
            'date_end' => Carbon::now()->addDays(14)->toDateTimeString(),
        ]);
    }
}
