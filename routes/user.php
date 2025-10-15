<?php


use App\Http\Controllers\User\GeneralController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\User\TicketController;
use App\Http\Controllers\User\WishlistController;
use App\Http\Controllers\User\NotificationController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(static function () {
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [GeneralController::class, 'index'])->name('user.dashboard');
        Route::get('/order', [OrderController::class, 'index'])->name('user.orders');
        Route::get('/transaction', [TransactionController::class, 'index'])->name('user.transactions');
        Route::get('/ticket', [TicketController::class, 'index'])->name('user.tickets');
        Route::get('/wishlist', [WishlistController::class, 'index'])->name('user.wishlists');
        Route::get('/notification', [NotificationController::class, 'index'])->name('user.notifications');
    });

});

