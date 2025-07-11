<?php

use App\Http\Controllers\DokumenController;
use App\Http\Controllers\PengajuanController;
use App\Models\Dokumen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth'])->group(function () {
    Route::apiResource('pengajuan', PengajuanController::class);
    Route::prefix('pengajuan/{pengajuanId}')->group(function () {
        Route::apiResource('dokumen', DokumenController::class)->except(['index']);
        Route::get('dokumen', [DokumenController::class, 'index']);
    });
});
