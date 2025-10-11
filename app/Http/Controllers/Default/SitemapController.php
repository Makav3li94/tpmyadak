<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Carbon\Carbon;

class SitemapController extends Controller
{
    public function index(): \Illuminate\Http\Response
    {
        return response()->view('sitemap.index')->header('Content-Type', 'text/xml');
    }

//    public function categories(): \Illuminate\Http\Response
//    {
//        return response()->view('sitemap.categories')->header('Content-Type', 'text/xml');
//    }

    public function main(): \Illuminate\Http\Response
    {
        return response()->view('sitemap.main')->header('Content-Type', 'text/xml');
    }

    public function blogs(): \Illuminate\Http\Response
    {
        $posts = Blog::withoutEvents(function ()  {
            return Blog::select('id','slug','updated_at')->where([['is_page', 0], ['status', true]])->whereDate('published_at', '<=', Carbon::today())->latest()->get();
        });

        return response()->view('sitemap.blogs', [
            'articles' => $posts,
        ])->header('Content-Type', 'text/xml');
    }

//    public function products(): \Illuminate\Http\Response
//    {
//        $products = Product::withoutEvents(function ()  {
//            return Product::select('id','title','slug','image','updated_at')->where([['is_active', '1'],['is_fetched','0']])->orderBy('created_at', 'desc')->get();
//        });
//
//        return response()->view('sitemap.products', [
//            'products' => $products,
//        ])->header('Content-Type', 'text/xml');
//    }
//    public function productImages(): \Illuminate\Http\Response
//    {
//        $products = Product::withoutEvents(function ()  {
//            return Product::select('id','title','slug','updated_at')->with('images3:id,product_id,image')->where([['is_active', '1'],['is_fetched','0']])->orderBy('created_at', 'desc')->get();
//        });
//
//        return response()->view('sitemap.product_images', [
//            'products' => $products,
//        ])->header('Content-Type', 'text/xml');
//    }
    public function blogImages(): \Illuminate\Http\Response
    {

        $posts = Blog::withoutEvents(function ()  {
            return Blog::select('id','title','slug','img_cover','updated_at')->where([['is_page', 0], ['status', 'active']])->whereDate('published_at', '<=', Carbon::today())->latest()->get();
        });
        return response()->view('sitemap.blog_images', [
            'posts' => $posts,
        ])->header('Content-Type', 'text/xml');
    }
}
