<?php

use App\Http\Controllers\Admin\AddressController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AttributeGroupController;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\Admin\BlogCategoryController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CarBrandController;
use App\Http\Controllers\Admin\CarModelController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\FilterController;
use App\Http\Controllers\Admin\GeneralController;
use App\Http\Controllers\Admin\LogReaderController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\OrderDetailController;
use App\Http\Controllers\Admin\PaymentMethodController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\ShippingMethodController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\TaxController;
use App\Http\Controllers\Admin\TicketController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Default\InvoiceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('tpmauto')->group(static function () {

    // Guest routes
    Route::middleware('guest:admin')->group(static function () {
        // Auth routes
        Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('admin.login');
        Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('admin.store');
    });
    // Authenticated routes
    Route::middleware(['auth:admin'])->group(static function () {
        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('admin.logout');
        // General routes
        Route::get('/dashboard', [GeneralController::class, 'index'])->name('admin.dashboard');

        Route::get('/maintance', [GeneralController::class, 'maintance'])->name('admin.maintance');

        // User
        Route::resource('users', UserController::class, ['names' => 'admin.users'])->except(['show']);
        Route::resource('address', AddressController::class, ['names' => 'admin.addresses'])->only(['store', 'update', 'destroy']);
        // admins
        Route::get('/admins', [AdminController::class, 'index'])->name('admin.admins.index');
        Route::post('/admins', [AdminController::class, 'store'])->name('admin.admins.store');
        Route::put('/admins/{admin}', [AdminController::class, 'update'])->name('admin.admins.update');
        Route::delete('/admins/{admin}', [AdminController::class, 'destroy'])->name('admin.admins.destroy');

        // Permission
        Route::delete('_permissions/{permission}', [PermissionController::class, 'destroy'])->name('admin.permissions.destroy');
        Route::put('_permissions/{permission}', [PermissionController::class, 'update'])->name('admin.permissions.update');
        Route::post('_permissions', [PermissionController::class, 'store'])->name('admin.permissions.store');
        Route::get('_permissions', [PermissionController::class, 'index'])->name('admin.permissions.index');

        // Role
        Route::resource('/roles', RoleController::class, ['names' => 'admin.roles']);

        // Setting
        Route::get('/settings', [SettingController::class, 'index'])->name('admin.setting.index');
        Route::post('/settings', [SettingController::class, 'update'])->name('admin.setting.update');

        // Profile
        Route::get('/profile', [ProfileController::class, 'edit'])->name('admin.profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('admin.profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('admin.profile.destroy');

        Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('admin.audit-logs.index');
        Route::get('/error-logs', [LogReaderController::class, 'getLogs'])->name('admin.errlogs.index');

        Route::get('/backup', [BackupController::class, 'index'])->name('admin.backup.index');
        Route::post('/backup/run', [BackupController::class, 'run'])->name('admin.backup.run');
        Route::get('/backup/download/{file}', [BackupController::class, 'download'])->name('admin.backup.download');
        Route::delete('/backup/delete/{file}', [BackupController::class, 'delete'])->name('admin.backup.delete');

        Route::delete('/blog-categories/{blogCategory}', [BlogCategoryController::class, 'destroy'])->name('admin.blog.categories.destroy');
        Route::put('/blog-categories/{blogCategory}', [BlogCategoryController::class, 'update'])->name('admin.blog.categories.update');
        Route::post('/blog-categories', [BlogCategoryController::class, 'store'])->name('admin.blog.categories.store');
        Route::get('/blog-categories', [BlogCategoryController::class, 'index'])->name('admin.blog.categories.index');

        Route::resource('/blogs', BlogController::class, ['names' => 'admin.blogs']);
        Route::post('/tinyupload', [UploadController::class, 'upload'])->name('admin.tiny.upload');

        Route::get('ticket/status/{ticket}', [TicketController::class, 'status'])->name('admin.tickets.toggle');
        Route::resource('ticket', TicketController::class, ['names' => 'admin.tickets'])->only(['index', 'show', 'create', 'destroy']);
        Route::resource('faq', FaqController::class, ['names' => 'admin.faq'])->only(['update']);

        Route::resource('brand', BrandController::class, ['names' => 'admin.brands'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('car-brand', CarBrandController::class, ['names' => 'admin.car.brands'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('car-model', CarModelController::class, ['names' => 'admin.car.models'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('supplier', SupplierController::class, ['names' => 'admin.suppliers'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('attribute-group', AttributeGroupController::class, ['names' => 'admin.attribute.groups'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('tax', TaxController::class, ['names' => 'admin.taxes'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('filter', FilterController::class, ['names' => 'admin.filters'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('product-categories', ProductCategoryController::class, ['names' => 'admin.product.categories'])->except(['show']);
        Route::resource('product', ProductController::class, ['names' => 'admin.products'])->except(['show']);
        Route::get('getCategoryFiltersAjax/{productCategory}', [ProductController::class, 'getCategoryFiltersAjax'])->name('admin.getCategoryFiltersAjax');

        Route::resource('order', OrderController::class, ['names' => 'admin.orders'])->except(['edit']);
        Route::resource('order-detail', OrderDetailController::class, ['names' => 'admin.order.details'])->only(['store', 'update', 'destroy']);
        Route::resource('transaction', TransactionController::class, ['names' => 'admin.transactions'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('shipping-method', ShippingMethodController::class, ['names' => 'admin.shipping.methods'])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('payment-method', PaymentMethodController::class, ['names' => 'admin.payment.methods'])->only(['index', 'store', 'update', 'destroy']);

        Route::get('invoice/{order}', [InvoiceController::class, 'show'])->name('admin.invoice.show');
        // #Admin

        //
    });

});
