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
        Schema::create('blogs', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();
            $table->ulid('category_id');
            $table->ulid('subcategory_id');

            // relations

            $table->string('title');
            $table->tinyText('excerpt');
            $table->string('slug', 200)->index();
            $table->string('img_cover', 200)->nullable();
            $table->longText('body')->nullable();
            $table->tinyInteger('is_page')->default(0)->comment("0 for blog 1 for page");
            $table->integer('total_view')->nullable()->default(1);
            $table->dateTime('published_at')->nullable();
            $table->boolean('status')->nullable()->default(true);
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
        Schema::dropIfExists('blogs');
    }
};
