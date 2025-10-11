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
        Schema::create('product_attributes', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();

            $table->string('title', 255);
            $table->ulid('attribute_group_id');
            $table->ulid('product_id');
            $table->string('add_price')->nullable()->default(0);
            $table->integer('sort')->nullable()->default(0);
            $table->boolean('status')->nullable()->default(true);
            $table->index(['product_id', 'attribute_group_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_attributes');
    }
};
