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
        Schema::create('attribute_groups', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();

            // relations

            // columns
            $table->string('title', 255);
            $table->boolean('status')->nullable()->default(true);
            $table->integer('sort')->nullable()->default(0);
            $table->enum('type', ['radio', 'select', 'checkbox'])->nullable()->default('radio');

            // default
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attribute_groups');
    }
};
