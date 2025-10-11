<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();
            $table->ulid('order_id')->index();
            $table->ulid('product_id');
            // relations

            $table->string('title', 255);
            $table->unsignedBigInteger('amount');
            $table->unsignedBigInteger('discount');
            $table->unsignedBigInteger('unit');
//            $table->uuid('store_id')->default(1);
            $table->unsignedBigInteger('total_price')->default(0);
            $table->unsignedBigInteger('tax')->default(0);
//            $table->string('sku', 50);
//            $table->string('currency', 10);
//            $table->float('exchange_rate')->nullable();
            $table->string('attribute', 100)->nullable();

            // default
            $table->timestamps();
            $table->softDeletes();
            $table->ulid('created_by')->nullable();
            $table->ulid('updated_by')->nullable();
            $table->ulid('deleted_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
