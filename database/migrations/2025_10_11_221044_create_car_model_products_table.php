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
        Schema::create('car_model_products', function (Blueprint $table) {
            $table->ulid('product_id')->index();
            $table->ulid('car_model_id')->index();
            $table->foreign('product_id')->references('id')->on('product_id')
                ->onDelete('cascade');
            $table->foreign('car_model_id')->references('id')->on('car_models')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_model_products');
    }
};
