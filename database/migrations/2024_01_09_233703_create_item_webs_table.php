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
        Schema::create('item_webs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('section_web_id')->nullable();
            $table->unsignedBigInteger('type_item_web_id')->nullable();
            $table->string('title')->nullable();
            $table->string('element')->default('div');
            $table->longText('description')->nullable();
            $table->string('footer')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
            $table->softDeletes(); 
            
            //foreing key 
            $table->foreign('section_web_id')->references('id')->on('section_webs')->onDelete('cascade');
            $table->foreign('type_item_web_id')->references('id')->on('type_item_webs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('item_webs');
        Schema::enableForeignKeyConstraints();
    }
};
