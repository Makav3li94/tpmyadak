<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Shop\Wishlist;

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
}
