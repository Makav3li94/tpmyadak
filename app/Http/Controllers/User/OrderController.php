<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Shop\Order;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with('user')->where('user_id', auth()->id())->orderBy('created_at', 'desc')->paginate(10);

        return inertia('user/order/index', [
            'data' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        return inertia('user/order/show', [
            'order' => $order->load('details','transaction:id,order_id,verify_code,created_at','details.product:id,image,sku'),
        ]);
    }
}
