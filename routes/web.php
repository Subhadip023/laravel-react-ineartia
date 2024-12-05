<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/admin',function(){
    return Inertia::render('Admin/Index');
})->name('admin')->middleware(['auth', 'role:admin|super-admin']);;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('users', RolePermissionController::class);
Route::post('role/assign/user', [RoleController::class, 'assignUser'])->middleware('auth')->name('assignUser');
Route::put('role/update-user/{role}', [RoleController::class, 'updateUser'])->middleware('auth')->name('updateUser');

Route::put('role/addPermissions/{role}', [RoleController::class, 'addPermissions'])->middleware('auth')->name('addPermissions');
Route::resource('roles', RoleController::class)->middleware('auth');

Route::resource('permissions', PermissionController::class)
    ->middleware(['auth', 'role:admin|super-admin']);






require __DIR__ . '/auth.php';
