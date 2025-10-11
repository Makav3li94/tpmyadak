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
        Schema::create('familiarities', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();

            // relations

            // columns
            $table->string('title');
            $table->softDeletes();
            // default
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('familiarities');
    }
};
