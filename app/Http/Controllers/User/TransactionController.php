<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Shop\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('order')->where('user_id', auth()->id())->paginate(10);

        return inertia('user/transaction/index', [
            'data' => $transactions,
        ]);
    }
}
