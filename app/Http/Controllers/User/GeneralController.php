<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Shop\Order;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function index(Request $request)
    {
        $stats = Order::selectRaw("
    COUNT(*) as total,
    SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as done_count,
    SUM(CASE WHEN status = 'canceled' THEN 1 ELSE 0 END) as canceled_count
")->where('user_id', auth()->id())->first();
        return inertia('user/dashboard', [
            'stats' => $stats
        ]);
    }
}
