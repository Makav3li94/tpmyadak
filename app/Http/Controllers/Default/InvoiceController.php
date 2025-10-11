<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Shop\Order;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function show(Order $order){
      return  inertia('admin/invoice/show',[
            'order' => $order->load(['details','details.product:id,price,title,minimum', 'user','shippingMethod','paymentMethod']),
        ]);
    }
}
