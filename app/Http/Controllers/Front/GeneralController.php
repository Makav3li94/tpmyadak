<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function index(Request $request)
    {
        return inertia('main/welcome/index', [
        ]);
    }
}
