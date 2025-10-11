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
        Schema::create('tickets', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('user_id');
            $table->string('title');
            $table->enum('section', ['پشتیبانی','فروش', 'مدیریت', 'مالی'])->default('پشتیبانی');
            $table->enum('priority', ['عادی', 'مهم', 'خیلی مهم'])->default('عادی');
            $table->enum('status', ['0', '1'])->default('1')->comment('Closed ticket : 0 , Opened Ticket : 1');
            $table->enum('answer', ['0', '1', '2'])->default('0')->comment('User message : 0 , User message is being considered : 1 , Admin message : 2');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
