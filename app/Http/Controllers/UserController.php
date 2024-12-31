<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Include 'addresses' in the relationships being loaded
        $users = User::with('roles', 'permissions', 'addresses')->paginate(5);

        $countries = [];

        // Check if the 'countries' table exists
        if (Schema::hasTable('countries')) {
            $countries = DB::table('countries')->get();
        }
        
        if (auth()->user()->hasPermissionTo('show users')) {
            return inertia('Admin/User', ['users' => $users, 'countries' => $countries]);
        }

        abort(403, 'Cannot see user');
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
