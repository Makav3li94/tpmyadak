<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FrontBlogController extends Controller
{
    public function getBlogs(Request $request)
    {
        $query = Blog::where([['status', 1], ['is_page', 0]])->whereDate('published_at', '<=', Carbon::now());
        if ($request->category) {
            $query->where('category_id', $request->category);
        }
        if ($request->subcategory) {
            $query->where('subcategory_id', $request->subcategory);
        }
        if ($request->column) {
            $cl = explode(',', $request->column);
            $query->orderBy($cl[0], $cl[1]);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return inertia('main/blog/list', [
            'data' => $query->with('category')->paginate(10),
            'categories' => BlogCategory::tree(),
        ]);
    }

    public function getBlog($slug)
    {
        $blog = Blog::where('slug', $slug)->first();
        $reviews = $blog->reviews()->with('author')->get();
        $canReview = true;
        if (auth()->user()) {
            if ($blog->hasReviewed(auth()->user())) {
                $canReview = false;
            }
        }
        return inertia('main/blog/single', [
            'blog' => $blog,
            'reviews' => $reviews,
            'canReview' => $canReview,
        ]);
    }
}
