<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    $user = auth()->user();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'roles' => $user ? $user->getRoleNames() : [],

    ]);
});

Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
})->name('admin')->middleware(['auth', 'role:admin|super-admin']);
;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::resource('users', UserController::class)
    ->middleware('auth');


Route::post('role/assign/user', [RoleController::class, 'assignUser'])->middleware(['auth', 'role:admin|super-admin'])->name('assignUser');
Route::put('role/update-user/{role}', [RoleController::class, 'updateUser'])->middleware('auth')->name('updateUser');

Route::put('role/addPermissions/{role}', [RoleController::class, 'addPermissions'])->middleware(['auth', 'role:admin|super-admin'])->name('addPermissions');
Route::resource('roles', RoleController::class)->middleware(['auth', 'role:admin|super-admin']);

Route::resource('permissions', PermissionController::class)
    ->middleware(['auth', 'role:admin|super-admin']);


Route::post('/states', function (Request $request) {



    $states = DB::table('states')
        ->where('country_id', $request->input('countryId'))
        ->get();

    return response()->json([
        'success' => true,
        'data' => $states,
    ]);
})->name('states');


Route::post('/cities',function (Request $request)  {

    $cities=DB::table('cities')->where('state_id',$request->input('stateId'))->get();
    return response()->json([
        'success'=>true,
        'data'=>$cities
    ]);
    
})->name('cities');









require __DIR__ . '/auth.php';
