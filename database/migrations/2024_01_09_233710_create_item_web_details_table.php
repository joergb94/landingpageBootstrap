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
        Schema::create('item_web_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_web_id')->nullable();
            $table->unsignedBigInteger('element_web_id')->nullable();
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
            $table->softDeletes();
            //foreing key 
            $table->foreign('item_web_id')->references('id')->on('item_webs')->onDelete('cascade');
            $table->foreign('element_web_id')->references('id')->on('element_webs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_web_details');
    }
};
