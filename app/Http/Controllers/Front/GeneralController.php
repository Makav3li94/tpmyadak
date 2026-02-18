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

        //              json_encode(ProductCategory::tree(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);  ;
        return inertia('main/welcome/index', [
            'sliders' => $sliders,
            'promoProducts' => inertia()->defer(fn () => Product::where('status_promotion', 1)
                ->whereDate('date_end', '>=', Carbon::now())->limit(7)->get()),
            'latestProducts' => inertia()->defer(fn () => Product::where('status_promotion', 0)->latest()
                ->limit(4)->get()),
            'productCategories' => inertia()->defer(fn () => ProductCategory::where([['parent_id', 0], ['status', 1]])
                ->get()),
            'brands' => inertia()->defer(fn () => Brand::where('status', 1)
                ->limit(6)->get()),
            'latestBlogs' => inertia()->defer(fn () => Blog::where('status', 1)->with('category:id,slug,title')
                ->limit(3)->get()),
        ]);
    }

    public function about()
    {
        $brands = Brand::where('status', 1)->limit(6)->get();

        return inertia('main/other/about', [
            'brands' => $brands,
        ]);
    }

    public function contact()
    {
        return inertia('main/other/contact');
    }

    public function faq() {
        return inertia('main/other/faq');
    }

    public function rules() {}

    public function privacy() {}

    public function guaranty() {}

    public function support() {}

    public function search($search_term_string): \Illuminate\Http\JsonResponse
    {
        $term = trim($search_term_string);

        if (strlen($term) < 2) {
            return response()->json(['status' => 'empty', 'data' => []], 201);
        }

        // جستجوی محصولات
        $products = DB::table('products')
            ->select('id', 'title', 'slug', 'sku')
            ->where('status', 1)
            ->where('title', 'like', "%{$term}%")
            ->whereNull('deleted_at')
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get()
            ->toArray();

        // جستجوی دسته‌ها
        $categories = DB::table('product_categories')
            ->select('id', 'title', 'slug')
            ->where('status', 1)
            ->where('title', 'like', "%{$term}%")
            ->whereNull('deleted_at')
            ->orderBy('sort', 'asc')
            ->limit(5)
            ->get()
            ->toArray();
        $brands = DB::table('brands')
            ->select('id', 'title', 'slug')
            ->where('status', 1)
            ->whereNull('deleted_at')
            ->where('title', 'like', "%{$term}%")
//            ->orderBy('sort', 'asc')
            ->limit(5)
            ->get()
            ->toArray();

        // ترکیب نتیجه‌ها با نوع برای frontend
        $results = [];

        foreach ($categories as $cat) {
            $results[] = [
                'type' => 'category',
                'id' => $cat->id,
                'title' => $cat->title,
                'slug' => $cat->slug,
            ];
        }
        foreach ($brands as $brand) {
            $results[] = [
                'type' => 'brand',
                'id' => $brand->id,
                'title' => $brand->title,
                'slug' => $brand->slug,
            ];
        }
        foreach ($products as $prod) {
            $results[] = [
                'type' => 'product',
                'id' => $prod->id,
                'title' => $prod->title,
                'slug' => $prod->slug,
                'sku' => $prod->sku,
            ];
        }

        return response()->json([
            'status' => count($results) > 0 ? 'success' : 'empty',
            'data' => $results
        ], 201);
    }


    public function dodoltala()
    {

    }
}
