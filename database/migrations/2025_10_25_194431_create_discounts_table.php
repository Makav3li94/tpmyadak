<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('discounts', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();
            $table->ulid('user_id')->nullable();
            $table->ulid('product_category_id')->nullable();

            // relations

            $table->string('title');
            $table->string('code');
            $table->tinyInteger('percentage')->nullable();
            $table->integer('max_limit')->nullable()->default(1);
            $table->bigInteger('max_minus')->nullable();
            $table->dateTime('active_at')->nullable();
            $table->dateTime('expire_at')->nullable();
            $table->boolean('status');
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
        Schema::dropIfExists('discounts');
    }
};
