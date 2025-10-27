<?php

use App\Http\Controllers\User\FaqController;
use App\Http\Controllers\User\GeneralController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\TicketController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\User\WishlistController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(static function () {
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [GeneralController::class, 'index'])->name('user.dashboard');
        Route::resource('/order', OrderController::class, ['names' => 'user.orders']);
        Route::resource('/transaction', TransactionController::class, ['names' => 'user.transactions']);
        Route::resource('/ticket', TicketController::class, ['names' => 'user.tickets']);
        Route::resource('faq', FaqController::class, ['names' => 'user.faqs'])->only(['update']);
        Route::resource('/wishlist', WishlistController::class, ['names' => 'user.wishlists']);
        Route::resource('/notification', NotificationController::class, ['names' => 'user.notifications']);

    });

});
