<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();

            // relations
            $table->ulid('user_id')->index();
//            $table->ulid('dear_id')->nullable();
            $table->ulid('transaction_id')->nullable();
            $table->ulid('address_id')->nullable();
            $table->ulid('payment_method_id')->nullable();
            $table->ulid('shipping_method_id')->nullable();

            $table->unsignedBigInteger('shipping')->nullable()->default(0);
            $table->unsignedBigInteger('subtotal')->nullable()->default(0);
            $table->unsignedBigInteger('discount')->nullable()->default(0);
            $table->unsignedBigInteger('tax')->nullable()->default(0);
            $table->unsignedBigInteger('other_fee')->nullable()->default(0);
            $table->unsignedBigInteger('total')->nullable()->default(0);

            $table->unsignedBigInteger('received')->nullable()->default(0);
            $table->unsignedBigInteger('remaining')->nullable()->default(0);
//            $table->string('currency', 10);
//            $table->decimal('exchange_rate',15,2)->nullable();
//            $table->decimal('received',15,2)->nullable()->default(0);
//            $table->decimal('balance',15,2)->nullable()->default(0);

            $table->string('name')->comment('receiver name');
            $table->string('postal_code')->comment('receiver postal_code');
            $table->string('mobile')->nullable()->comment('receiver mobile');
            $table->string('phone')->nullable()->comment('receiver phone');
            $table->text('address')->comment('receiver address');

//            $table->enum('payment_method', ['online', 'bank', 'credit', 'crypto'])->default('online')->nullable();
            $table->string('payment_method',100)->nullable();
            $table->enum('payment_status', ['unpaid', 'partial ', 'paid', 'refund'])->default('unpaid')->nullable();

            $table->enum('shipping_status', ['refunded', 'done', 'sending', 'not_sent'])->default('not_sent')->nullable();
            $table->string('shipping_method',100)->nullable();
            $table->enum('status', ['new', 'pending', 'hold', 'verify', 'processing', 'done', 'canceled', 'refunded'])->default('new')->nullable();
//            $table->enum('type', ['ai','order','plan1','plan2','plan3','other'])->nullable()->default('ai');
            // columns
            $table->mediumText('note')->nullable();

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
        Schema::dropIfExists('orders');
    }
};
