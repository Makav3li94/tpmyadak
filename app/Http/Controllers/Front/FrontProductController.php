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

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }
        if ($request->priceMin || $request->priceMax) {
            // multi columns search
            $query->whereBetween('price', [(int) $request->priceMin, (int) $request->priceMax]);
        }
        if ($request->arrayFilter) {
            if ($request->group == 'brands') {
                $query->whereIn('brand_id', $request->arrayFilter);
            }
            if ($request->group == 'carBrands') {
                $arrayFilter = $request->arrayFilter;
                $query->whereHas('carModels', function ($query) use ($arrayFilter) {
                    $query->whereHas('carBrand', function ($query2) use ($arrayFilter) {
                        $query2->whereIn('id', $arrayFilter);
                    });
                });
            }
            if ($request->group == 'carModels') {
                $arrayFilter = $request->arrayFilter;
                $query->whereHas('carModels', function ($query) use ($arrayFilter) {
                    $query->whereIn('car_model_id', $arrayFilter);
                });
            }
            if ($request->group == 'categories') {
                $query->whereIn('product_category_id', $request->arrayFilter);
            }
        }
        if ($request->column) {
            $cl = explode(',', $request->column);
            $query->orderBy($cl[0], $cl[1]);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return inertia('main/product/list', [
            'data' => $query->paginate(10),
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
        return 123;
    }
}
