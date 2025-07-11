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
        Schema::create('pengajuan', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal')->nullable();
            $table->string('pembeli')->nullable();
            $table->string('lokasi_muat')->nullable();
            $table->string('lokasi_tujuan')->nullable();
            $table->string('kapal')->nullable();
            $table->bigInteger('pembayaran')->nullable();
            $table->double('kuantitas')->nullable();
            $table->double('kadar_nikel')->nullable();
            $table->enum('status', ['dimuat', 'belum_dimuat'])->default('belum_dimuat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan');
    }
};
