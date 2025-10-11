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
        Schema::create('products', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('alias', 120)->index();
            $table->string('excerpt')->nullable();
            $table->text('about')->nullable();
            $table->text('description')->nullable();
            // relations
            $table->ulid('product_category_id')->nullable()->default(0)->index();
            $table->ulid('brand_id')->nullable()->default(0)->index();
            $table->ulid('supplier_id')->nullable()->default(0)->index();
            $table->ulid('tax_id', 50)->nullable()->default(0)->comment('0:No-tax, auto: Use tax default')->index();
            // columns
            $table->string('sku', 50)->index();
            $table->string('upc', 20)->nullable()->comment('upc code');
            $table->string('ean', 20)->nullable()->comment('ean code');
            $table->string('jan', 20)->nullable()->comment('jan code');
            $table->string('isbn', 20)->nullable()->comment('isbn code');
            $table->string('mpn', 64)->nullable()->comment('mpn code');
            $table->string('image', 255)->nullable();

            $table->string('price')->nullable();
            $table->string('cost')->nullable()->comment('how much it costs for store!');
            $table->string('real_price')->nullable();
            $table->string('discount')->nullable();
            $table->timestamp('date_start', $precision = 0)->nullable();
            $table->timestamp('date_end', $precision = 0)->nullable();
            $table->integer('status_promotion')->nullable()->default(0);
            $table->integer('stock')->nullable()->default(0);
            $table->integer('total_view')->nullable()->default(1);
            $table->integer('total_sale')->nullable()->default(0);
            $table->integer('total_comment')->nullable()->default(0);
            $table->integer('total_score')->nullable()->default(0);
            $table->integer('minimum')->nullable()->default(0);
            $table->tinyInteger('kind')->nullable()->default(0)->comment('0:single, 1:bundle, 2:group')->index();

            $table->boolean('status')->nullable()->default(true)->index();
            $table->boolean('approve')->nullable()->default(false)->index();

            $table->timestamp('date_lastview', $precision = 0)->nullable();
            $table->date('date_available')->nullable();

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
        Schema::dropIfExists('products');
    }
};
