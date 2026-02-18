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
        Schema::create('car_type_products', function (Blueprint $table) {
            $table->ulid('product_id')->index();
            $table->ulid('car_type_id')->index();
            $table->foreign('product_id')->references('id')->on('products')
                ->onDelete('cascade');
            $table->foreign('car_type_id')->references('id')->on('car_types')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_type_products');
    }
};
