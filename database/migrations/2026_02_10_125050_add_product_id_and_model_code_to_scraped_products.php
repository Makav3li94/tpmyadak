<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('scraped_products', function (Blueprint $table) {
            $table->ulid('product_id')->nullable()->after('url');
            $table->string('model_code')->nullable()->after('product_id');

            $table->index('product_id');
            $table->index('model_code');
        });
    }

    public function down(): void
    {
        Schema::table('scraped_products', function (Blueprint $table) {
            $table->dropIndex(['product_id']);
            $table->dropIndex(['model_code']);

            $table->dropColumn(['product_id', 'model_code']);
        });
    }
};
