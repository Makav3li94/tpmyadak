<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontOrderController extends Controller
{
    public function cart()
    {
        return inertia('main/order/cart');
    }
}
