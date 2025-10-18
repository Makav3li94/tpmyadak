<?php

use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\Default\SitemapController;
use App\Http\Controllers\Front\FrontBlogController;
use App\Http\Controllers\Front\GeneralController;
use Illuminate\Support\Facades\Route;

// define module as main route
// Route::get('/', [App\Module\Shortlink\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', [GeneralController::class, 'index'])->name('home');
Route::post('/prsearch/{search_term_string}', [GeneralController::class, 'search'])->name('home.product.search');
Route::get('/article/{slug}', [FrontBlogController::class, 'getBlog'])->name('home.getBlog');

// #Guest

// Route::get('/{link:code}', [App\Module\Shortlink\Controllers\HomeController::class, 'redirect'])->name('redirect');
require __DIR__.'/user.php';
require __DIR__.'/admin.php';

Route::get('files/{file}', [FileController::class, 'show'])->name('file.show');

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/sitemap/main.xml', [SitemapController::class, 'main']);
Route::get('/sitemap/articles.xml', [SitemapController::class, 'blogs']);
// Route::get('/sitemap/products.xml', [SitemapController::class, 'products']);
// Route::get('/sitemap/product_images.xml', [SitemapController::class, 'productImages']);
Route::get('/sitemap/blog_images.xml', [SitemapController::class, 'blogImages']);
// Route::get('/sitemap/categories.xml', [SitemapController::class, 'categories']);

// FEEED
Route::feeds();
