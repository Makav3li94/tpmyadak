<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Shop\Brand;
use App\Models\Shop\Product;
use App\Models\Shop\ProductCategory;
use App\Models\Slider;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GeneralController extends Controller
{
    public function index(Request $request)
    {
        $sliders = Slider::where('status', 1)->get();

        return inertia('main/welcome/index', [
            'sliders' => $sliders,
            'promoProducts' => inertia()->defer(fn () => Product::where('status_promotion', 1)
                ->whereDate('date_end', '>=', Carbon::now())->limit(3)->get()),
            'latestProducts' => inertia()->defer(fn () => Product::where('status_promotion', 0)
                ->limit(3)->get()),
            'productCategories' => inertia()->defer(fn () => ProductCategory::with('children')->where([['parent_id', 0], ['status', 1]])
                ->limit(6)->get()),
            'brands' => inertia()->defer(fn () => Brand::where('status', 1)
                ->limit(6)->get()),
            'latestBlogs' => inertia()->defer(fn () => Blog::where('status', 1)->with('category:id,slug,title')
                ->limit(3)->get()),
        ]);
    }

    public function search($search_term_string): \Illuminate\Http\JsonResponse
    {
        $data = DB::table('products')
            ->select('id', 'title', 'slug')
            ->where([['status', 1], ['approve', 1], ['title', 'like', '%'.$search_term_string.'%']])
//            ->orWhere([['is_active', '1'],['is_fetched','0'], ['excerpt', 'like', '%' . $val . '%']])
            ->orderBy('id', 'desc')->limit(5)->get()->toArray();

        return response()->json(['status' => count($data) > 0 ? 'success' : 'empty', 'data' => $data], 201);
    }
}
