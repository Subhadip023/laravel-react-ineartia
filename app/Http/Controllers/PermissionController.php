<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        // Create the permission
        $permission = Permission::create([
            'name' => $validated['name'],
            'guard_name' => "web",
        ]);

        // Retrieve the super-admin role
        $role = Role::where('name', 'super-admin')->first();

        if ($role) {
            $role->givePermissionTo($permission);
        }

        return to_route('roles.index')->with('success', 'Permission created successfully.');


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        // Validate the incoming request
        $valData = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
        ]);
    
        // Update the permission name
        $permission->name = $valData['name'];
        $permission->save();
    
        // Redirect to the index page with a success message
        return to_route('roles.index')->with('success', 'Permission edited successfully.');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
if(Auth::user()->hasRole('admin') ||Auth::user()->hasRole('super-admin') )
{

    $permission->delete();

return to_route('roles.index')->with('success', 'Permission deleted successfully.');
}

return to_route('roles.index')->with('error', 'Permission cannot deleted .');

    }
}
