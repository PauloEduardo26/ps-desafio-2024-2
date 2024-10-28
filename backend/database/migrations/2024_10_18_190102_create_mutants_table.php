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
        Schema::create('mutants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('alias');
            $table->integer('age');
            $table->string('image');
            $table->foreignUuid('power_id')->constrained('powers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mutants');
    }
};
