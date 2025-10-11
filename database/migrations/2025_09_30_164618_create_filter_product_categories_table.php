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
        Schema::create('filter_product_categories', function (Blueprint $table) {
            // id
            $table->ulid('product_category_id')->index();
            $table->ulid('filter_id')->index();
            $table->foreign('product_category_id')->references('id')->on('product_categories')
                ->onDelete('cascade');
            $table->foreign('filter_id')->references('id')->on('filters')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filter_product_categories');
    }
};
