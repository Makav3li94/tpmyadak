<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Shop\Product;
use Illuminate\Http\Request;

class FrontReviewController extends Controller
{
    public function store(Request $request)
    {
        if ($request->review_type == 'blog') {
            $model = Blog::find($request->model_id);
        } elseif ($request->review_type == 'product') {
            $model = Product::find($request->model_id);
        } else {
            abort(404);
        }
        $model->review($request->body, auth()->user(), $request->overall, $request->title);

//        $model->review([
//            'title' => $request->title,
//            'review' => $request->body,
//            'department' => 'default',
//            'recommend' => $request->recommend,
//            'approved' => false,
//            'ratings' => [
//                'overall' => $request->overall,
//                'customer_service' => $request->customer_service,
//                'quality' => $request->quality,
//                'price' => $request->price,
//            ],
//        ], auth()->id());
    }
}
