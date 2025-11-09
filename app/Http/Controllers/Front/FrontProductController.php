<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Shop\Brand;
use App\Models\Shop\CarBrand;
use App\Models\Shop\CarModel;
use App\Models\Shop\Product;
use App\Models\Shop\ProductCategory;
use Illuminate\Http\Request;

class FrontProductController extends Controller
{
    public function getProducts(Request $request)
    {
        $query = Product::query();

        $this->commonFilters($request, $query);
        if ($request->column) {
            $cl = explode(',', $request->column);
            $query->orderBy($cl[0], $cl[1]);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return inertia('main/product/list', [
            'data' => $query->paginate(12),
            'brands' => queryMapper(Brand::where('status', 1)->get()),
            //            'brands' => inertia()->defer(fn () => queryMapper(Brand::where('status', 1)->get())),
            'carBrands' => queryMapper(CarBrand::get()),
            //            'carBrands' => inertia()->defer(fn () => queryMapper(CarBrand::get())),
            'carModels' => queryMapper(CarModel::get()),
            //            'carModels' => inertia()->defer(fn () => queryMapper(CarModel::get())),
            'categories' => ProductCategory::flatTree(),
        ]);
    }

    public function getProduct($sku, $slug = null)
    {

        $product = Product::where('sku', $sku)->first();
        $reviews = $product->reviews()->with('author')->get();
        $relatedProducts = $product->getRelatedProducts(4);
        $attributeGroupsWithDetails = $product->attributeGroupsWithDetails();

        $canReview = true;
        if (auth()->user()) {
            if ($product->hasReviewed(auth()->user())) {
                $canReview = false;
            }
        }
        $images = $this->passeImages($product->images);
        $jsnimages = json_encode($images['jsnimages']);
        unset($images['jsnimages']);

        defer(fn () => $product->increment('total_view'));

        return inertia('main/product/single', [
            'product' => $product->load('brand', 'carModels', 'specs', 'filters', 'images'),
            'attributeGroups' => $attributeGroupsWithDetails,
            'relatedProducts' => $relatedProducts,
            'reviews' => $reviews,
            'canReview' => $canReview,
            'images' => $images,

        ]);
    }

    public function getBrand($slug, Request $request)
    {
        $brand = Brand::where('slug', $slug)->firstOrFail();
        $query = Product::query();
        $query->where('brand_id', $brand->id);
        $this->commonFilters($request, $query);
        if ($request->column) {
            $cl = explode(',', $request->column);
            $query->orderBy($cl[0], $cl[1]);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return inertia('main/brand/list', [
            'brand' => $brand,
            'data' => $query->paginate(10),
            //            'brands' => inertia()->defer(fn () => queryMapper(Brand::where('status', 1)->get())),
            'carBrands' => queryMapper(CarBrand::get()),
            //            'carBrands' => inertia()->defer(fn () => queryMapper(CarBrand::get())),
            'carModels' => queryMapper(CarModel::get()),
            //            'carModels' => inertia()->defer(fn () => queryMapper(CarModel::get())),
            'categories' => ProductCategory::flatTree(),
        ]);
    }

    public function getCategory($slug, Request $request)
    {
        // 1. دسته‌بندی اصلی و زیر دسته‌ها
        $productCategory = ProductCategory::with('children')->where('slug', $slug)->firstOrFail();

        $categoryIds = array_merge([$productCategory->id], $productCategory->getAllChildrenIds());

        // 2. فیلترهای مرتبط با دسته و زیر دسته‌ها
        $filters = $productCategory->getAllChildrenFiltersWithValues();

        // 3. Query اصلی محصولات
        $query = Product::query();
        $query->whereIn('product_category_id', $categoryIds);
        $this->commonFilters($request, $query);

        // 7. فیلترهای داینامیک
        if ($request->dynamicFilters && is_array($request->dynamicFilters)) {
            foreach ($request->dynamicFilters as $filterId => $values) {
                $query->whereHas('filters', function ($q) use ($filterId, $values) {
                    $q->where('filters.id', $filterId)
                        ->whereIn('filter_products.value', $values);
                });
            }
        }

        // 8. مرتب‌سازی
        if ($request->column) {
            $cl = explode(',', $request->column);
            $query->orderBy($cl[0], $cl[1]);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // 9. بازگشت داده‌ها به Inertia
        return inertia('main/category/list', [
            'productCategory' => $productCategory,
            'filters' => $filters,
            'data' => $query->paginate(10),
            'brands' => queryMapper(Brand::where('status', 1)->get()),
            'carBrands' => queryMapper(CarBrand::get()),
            'carModels' => queryMapper(CarModel::get()),
        ]);
    }

    public function commonFilters(Request $request, $query): void
    {
        // 4. جستجوی متنی
        if ($request->q) {
            $query->where('title', 'like', "%{$request->q}%");
        }

        if ($request->has_promotion == 'true') {
            $query->where('status_promotion', 1);
        }

        if ($request->in_stock == 'true') {
            $query->where('stock', '>', 0);
        }

        // 5. محدوده قیمت
        if ($request->priceMin || $request->priceMax) {
            $query->whereBetween('price', [(int) $request->priceMin, (int) $request->priceMax]);
        }

        // 6. فیلترهای ثابت
        $staticFilters = $request->staticFilters ?? [];

        if (isset($staticFilters['brands']) && count($staticFilters['brands'])) {
            $query->whereIn('brand_id', $staticFilters['brands']);
        }

        if (isset($staticFilters['carBrands']) && count($staticFilters['carBrands'])) {
            $query->whereHas('carModels.carBrand', function ($q) use ($staticFilters) {
                $q->whereIn('id', $staticFilters['carBrands']);
            });
        }

        if (isset($staticFilters['carModels']) && count($staticFilters['carModels'])) {
            $query->whereHas('carModels', function ($q) use ($staticFilters) {
                $q->whereIn('car_model_id', $staticFilters['carModels']);
            });
        }
        if (isset($staticFilters['categories']) && count($staticFilters['categories'])) {
            $query->whereIn('product_category_id', $staticFilters['categories']);
        }
    }

    private function passeImages($product_images): array
    {
        $jsnimages = [];
        $images = [];

        foreach ($product_images as $image) {

            $webpic = $image['image'];
            $jpgpic = substr_replace($image['image'], 'jpg', -4, 4);
            //            $jsnimages[] = 'https://cdn.tpmyadak.com/productjpg/' . $jpgpic;
            //            $images[] = [
            //                "fullscreen" => 'https://cdn.tpmyadak.com/productjpg/' . $jpgpic,
            //                "main" => 'https://cdn.tpmyadak.com/product/' . $webpic,
            //                "original" => 'https://cdn.tpmyadak.com/product510/' . $webpic,
            //                "thumbnail" => 'https://cdn.tpmyadak.com/prothumb/' . $webpic,
            //                "thumbnailxs" => 'https://cdn.tpmyadak.com/product75/' . $webpic,
            //            ];
            $jsnimages[] = 'http://127.0.0.1:8000/storage/productjpg/'.$jpgpic;
            $images[] = [
                'fullscreen' => 'http://127.0.0.1:8000/storage/productjpg/'.$jpgpic,
                'main' => 'http://127.0.0.1:8000/storage/product/'.$webpic,
                'original' => 'http://127.0.0.1:8000/storage/product510/'.$webpic,
                'thumbnail' => 'http://127.0.0.1:8000/storage/prothumb/'.$webpic,
                'thumbnailxs' => 'http://127.0.0.1:8000/storage/product75/'.$webpic,
            ];
        }
        $images['jsnimages'] = $jsnimages;

        return $images;
    }
}
