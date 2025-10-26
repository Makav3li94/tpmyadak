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
        Schema::create('faqs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('admin_id')->nullable();
            $table->ulid('ticket_id');
            $table->string('user_file')->nullable();
            $table->string('admin_file')->nullable();
            $table->longText('question')->nullable();
            $table->longText('reply')->nullable();
            $table->integer('rate')->nullable();
            $table->enum('seen', ['0', '1', '2', '3'])->default('0')->comment('User Sent Question Admin has not seen : 0 , Admin has seen but has not replied yet : 1 , Admin replied user has not seen yet : 2, User has seen reply ; 3');
            $table->timestamp('reply_date')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreignUlid('admin_id')->references('id')->on('admins')->onDelete('cascade');
            $table->foreignUlid('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
