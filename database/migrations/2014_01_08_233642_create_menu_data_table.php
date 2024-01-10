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
    
        Schema::create('menu_data', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('icon', 100);
            $table->string('link', 100);
            $table->string('prioridad', 10);
            $table->boolean('active')->default(1);
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('menu_data');
        Schema::enableForeignKeyConstraints();
    }
};
