<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Redirect;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Auth;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('permissions', 'users')->get();
        $permissions= Permission::all();
        return inertia('Roles/Index', [
            'roles' => $roles,
            'flash' => session()->only(['success', 'error'],
    ),    'permissions'=>$permissions
        ]);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',      
        ]);
    
        // Create a new role
        $role = Role::create([
            'name' => $request->input('name'),
        ]);
    
        // Return the stored role (optional)
        return  to_route('roles.index')->with('success', 'Role Created successfully.');;
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
    public function edit(Role $role)
    {
      
        $role->load(['permissions', 'users']);
        $users=User::all();
        $permissions=Permission::all();
        return Inertia::render('Roles/Edit', ['role' => $role,'users'=>$users,'permissions'=>$permissions]);  

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */public function destroy(Role $role)
{
    if ($role->name == 'super-admin') {
        return to_route('roles.index')->with('error', 'The super-admin role cannot be deleted.');
    }

    if (!Auth::user()->hasRole('super-admin') && $role->name == 'admin') {
        return to_route('roles.index')->with('error', 'You do not have permission to delete the admin role.');
    }

    $role->delete();
    return to_route('roles.index')->with('success', 'Role deleted successfully.');
}



    // assign users role by user id 

    public function assignUser(Request $request)
    {



        $request->validate([
            'role' => 'required|exists:roles,id',
            'users' => 'required|array',
            'users.*' => 'exists:users,id',
        ]);


        if ($request->role->name=='super-admin' && auth()->user()->role->name=='super-admin') {
            return to_route('roles.index');
        }




        $role = Role::find($request->role);
        $role->users()->sync($request->users);

        // return redirect()->route('roles.index');   

        $roles = Role::with(['permissions', 'users'])->get();
        $users = User::all();

        // return redirect()->back()->with('success', 'Role Added to the user ');

        return to_route('roles.index');

    }

    public function addPermissions(Request $request, Role $role)
{
    // Validate incoming data
    $request->validate([
        'permissions' => 'array', // Expect an array of permission IDs
        'permissions.*' => 'exists:permissions,id', // Each permission ID must exist in the permissions table
    ]);

    // Sync the permissions for the role
    // This will add new permissions and remove ones that are not in the array
    $role->permissions()->sync($request->permissions);

    // Fetch updated data for the roles and permissions
    $roles = Role::with(['permissions', 'users'])->get();
    $users = User::all();

    // Return to the Roles page or render the view with updated data
    // return Inertia::render('Roles/Index', [
    //     'roles' => $roles,
    //     'users' => $users,
    // ]);

    return to_route('roles.index');


}




    public function updateUser(Request $request, Role $role)
    {
        // Validate incoming data
        $request->validate([
            'users' => 'array',
            'users.*' => 'exists:users,id',
        ]);
    
        // Sync users to the role
        $role->users()->sync($request->users);
    
        $roles = Role::with(['permissions', 'users'])->get();
        $users = User::all();

        // return Inertia::render('Roles/Index', ['roles' => $roles, 'users' => $users]); 
        return to_route('roles.index');
        // return Inertia::render('Roles/Index',['roles'=>$roles,'users'=>$users]);

    
    
    }
    


}
