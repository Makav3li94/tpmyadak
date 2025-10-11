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
        Schema::create('blog_categories', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();
            $table->ulid('parent_id')->nullable()->default(0);

            // relations

            // columns
            $table->string('title');
            $table->string('slug')->index();
            $table->string('image')->nullable();
            $table->boolean('status')->nullable()->default(true);
            $table->integer('sort')->nullable()->default(0);
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
        Schema::dropIfExists('blog_categories');
    }
};
