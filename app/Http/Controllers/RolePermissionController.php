<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class RolePermissionController extends Controller
{
    public function index(){
        $roles=Role::all();
        $permissions=Permission::with('permission')::with('user')->get();
        return Inertia::render('RolePermission/Index', ['roles' => $roles, 'permissions' => $permissions]);
    }

    



} 