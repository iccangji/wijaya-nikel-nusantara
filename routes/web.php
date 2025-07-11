<?php

use App\Http\Controllers\AlatController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\OperasionalController;
use App\Http\Controllers\PengajuanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/welcome', function () {
    return view('welcome');
});

Route::middleware(['auth', 'role:admin,pengajuan'])->group(function () {

    Route::get('/', [PengajuanController::class, 'index'])->name('pengajuan');
    Route::get('/pengajuan/tambah', function () {
        return Inertia::render('Pengajuan/Create');
    });
    Route::post('/pengajuan', [PengajuanController::class, 'store']);
    Route::get('/pengajuan/print', [PengajuanController::class, 'print']);
    Route::get('/pengajuan/{id}', [PengajuanController::class, 'show']);
    Route::put('/pengajuan/{id}', [PengajuanController::class, 'update']);
    Route::get('/pengajuan/{id}/edit', [PengajuanController::class, 'edit']);
    Route::delete('/pengajuan/{id}', [PengajuanController::class, 'destroy']);

    Route::delete('/dokumen/{id}', [DokumenController::class, 'destroy']);
});
Route::middleware(['auth', 'role:admin,operasional'])->group(function () {
    Route::get('/operasional', [OperasionalController::class, 'index'])->name('operasional');
    Route::get('/operasional/tambah', [OperasionalController::class, 'create']);
    Route::post('/operasional', [OperasionalController::class, 'store']);
    Route::get('/operasional/print', [OperasionalController::class, 'print']);
    Route::get('/operasional/{id}', [OperasionalController::class, 'show']);
    Route::delete('/operasional/{id}', [OperasionalController::class, 'destroy']);
    Route::get('/operasional/{id}/edit', [OperasionalController::class, 'edit']);
    Route::put('/operasional/{id}', [OperasionalController::class, 'update']);

    Route::get('/alat/tambah', function () {
        return Inertia::render('Alat/Create');
    });
    Route::post('/alat', [AlatController::class, 'store']);
    Route::get('/alat/print', [AlatController::class, 'print']);
    Route::get('/alat/{id}', [AlatController::class, 'show']);
    Route::delete('/alat/{id}', [AlatController::class, 'destroy']);
    Route::get('/alat/{id}/edit', [AlatController::class, 'edit']);
    Route::put('/alat/{id}', [AlatController::class, 'update']);
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'username' => ['required'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        $user = Auth::user();

        if ($user->role == 'admin') {
            return redirect()->intended('/');
        } elseif ($user->role == 'pengajuan') {
            return redirect()->intended('/');
        } elseif ($user->role == 'operasional') {
            return redirect()->intended('/operasional');
        } else {
            return redirect()->intended('/');
        }
    }

    return back()->withErrors([
        'username' => 'Username atau password salah.',
    ]);
});

// Route::get('/register', function () {
//     return Inertia::render('Auth/Register');
// })->name('register');

// Route::post('/register', function (Request $request) {
//     $validated = $request->validate([
//         'username' => ['required', 'string', 'max:255', 'unique:users'],
//         'password' => ['required', 'string', 'min:6'],
//     ]);

//     $user = User::create([
//         'username' => $validated['username'],
//         'password' => Hash::make($validated['password']),
//     ]);
//     return redirect()->route('login');
// });

Route::post('/logout', function () {
    Auth::logout();
    return redirect()->route('login');
});
