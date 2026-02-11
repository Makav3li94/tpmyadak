<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weekly_scraper_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignUlid('scraped_product_id')->nullable()->constrained('scraped_products')->nullOnDelete();
            $table->string('model_code')->nullable();
            $table->text('url');
            $table->enum('status', ['updated', 'unavailable', 'error']);
            $table->unsignedBigInteger('price_before')->nullable();
            $table->unsignedBigInteger('price_after')->nullable();
            $table->text('message')->nullable();
            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weekly_scraper_logs');
    }
};
