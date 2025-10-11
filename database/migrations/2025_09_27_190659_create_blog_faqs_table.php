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
        Schema::create('blog_faqs', function (Blueprint $table) {
            // id
            $table->ulid('blog_id')->primary();
            $table->string('q1',255)->nullable();
            $table->text('a1')->nullable();
            $table->string('q2',255)->nullable();
            $table->text('a2')->nullable();
            $table->string('q3',255)->nullable();
            $table->text('a3')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_faqs');
    }
};
