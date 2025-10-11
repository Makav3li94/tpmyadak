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
        Schema::create('transactions', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();
            $table->ulid('user_id')->index();
            $table->ulid('order_id')->index();
            $table->string('price');
            $table->enum('status', ['0', '1'])->default('0')->comment('is paid or not');
            $table->enum('type', ['deposit','withdraw','order','other'])->nullable()->default('order');
            $table->string('transaction_id')->nullable();
            $table->string('verify_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
