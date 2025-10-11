<?php


use App\Http\Controllers\User\GeneralController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('user.dashboard');
});

