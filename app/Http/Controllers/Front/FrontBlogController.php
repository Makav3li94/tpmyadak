<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Blog;

class FrontBlogController extends Controller
{
    public function getBlogs() {}

    public function getBlog($slug)
    {
        return $blog=Blog::where('slug',$slug)->first();
    }
}
