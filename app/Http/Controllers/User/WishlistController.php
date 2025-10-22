<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Shop\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlists = Wishlist::with('product:id,title')->where('user_id', auth()->id())->paginate(10);

        return inertia('user/wishlist/index', [
            'data' => $wishlists,
        ]
        );
    }
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        Wishlist::where([['user_id', auth()->id()], ['product_id', $request['item']['id']]])->delete();
        Wishlist::create([
            'user_id' => auth()->id(),
            'product_id' => $request['item']['id'],
            'status' => 0,
        ]);
        return back()->with('message', ['type' => 'success', 'message' => 'محصول به علاقه مندی اضافه شد.']);
    }
}
