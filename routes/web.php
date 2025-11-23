<?php

use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\Default\SitemapController;
use App\Http\Controllers\Front\FrontBlogController;
use App\Http\Controllers\Front\FrontOrderController;
use App\Http\Controllers\Front\FrontProductController;
use App\Http\Controllers\Front\FrontReviewController;
use App\Http\Controllers\Front\GeneralController;
use Illuminate\Support\Facades\Route;

// define module as main route
// Route::get('/', [App\Module\Shortlink\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', [GeneralController::class, 'index'])->name('home');
Route::post('/prsearch/{search_term_string}', [GeneralController::class, 'search'])->name('home.product.search');

Route::get('/products', [FrontProductController::class, 'getProducts'])->name('home.getProducts');
Route::get('/product/{sku}/{slug?}', [FrontProductController::class, 'getProduct'])->name('home.getProduct');

Route::get('/brand/{slug?}', [FrontProductController::class, 'getBrand'])->name('home.getBrand');
Route::get('/category/{slug?}', [FrontProductController::class, 'getCategory'])->name('home.getCategory');

Route::get('/articles', [FrontBlogController::class, 'getBlogs'])->name('home.getBlogs');
Route::get('/article/{slug}', [FrontBlogController::class, 'getBlog'])->name('home.getBlog');

Route::get('/cart', [FrontOrderController::class, 'cart'])->name('home.cart');

Route::post('/cart/refresh-prices', [FrontOrderController::class, 'refreshCart'])->name('home.cart.refresh');


Route::middleware(['auth'])->group(function () {
    Route::post('/comment-store', [FrontReviewController::class, 'store'])->name('user.review.store');

    Route::get('/checkout', [FrontOrderController::class, 'checkout'])->name('home.checkout');
    Route::post('/order', [FrontOrderController::class, 'order'])->name('home.order');
    Route::get('/discount/{code}/', [FrontOrderController::class, 'discount'])->name('home.discount');
    Route::post('/address', [FrontOrderController::class, 'address'])->name('home.address');
    Route::get('/check_payment/{order_id?}', [FrontOrderController::class, 'checkPayment'])->name('home.check_payment');
});
// #Guest

// Route::get('/{link:code}', [App\Module\Shortlink\Controllers\HomeController::class, 'redirect'])->name('redirect');
require __DIR__.'/user.php';
require __DIR__.'/admin.php';

Route::get('files/{file?}/{dir?}', [FileController::class, 'show'])->name('file.show');

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/sitemap/main.xml', [SitemapController::class, 'main']);
Route::get('/sitemap/articles.xml', [SitemapController::class, 'blogs']);
// Route::get('/sitemap/products.xml', [SitemapController::class, 'products']);
// Route::get('/sitemap/product_images.xml', [SitemapController::class, 'productImages']);
Route::get('/sitemap/blog_images.xml', [SitemapController::class, 'blogImages']);
// Route::get('/sitemap/categories.xml', [SitemapController::class, 'categories']);

// FEEED
Route::feeds();
