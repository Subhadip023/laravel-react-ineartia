<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Models\Address;
use DB;


class AddressController extends Controller
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

     public function store(StoreAddressRequest $request)
     {
         // Validate incoming data
         $valData = $request->validated();

        //  return $valData;
     
         // Fetch related country, state, and city names
         $country = DB::table('countries')->where('id', $valData['country'])->value('name');
         $state = DB::table('states')->where('id', $valData['state'])->value('name');
         $city = DB::table('cities')->where('id', $valData['city'])->value('name');
     
         // Check if the required entities were found
         if (!$country || !$state || !$city) {
             return redirect()->back()->withErrors('Invalid country, state, or city selected.');
         }
     
         // Create the address
         $address = Address::create([
             'user_id' => $valData['user_id'],
             'street' => $valData['street'],
             'city' => $city,
             'state' => $state,
             'country' => $country,
             'postal_code' => $valData['postal_code'],
         ]);
        //  session()->flash('success', 'Address Created Successfully!');

         return redirect()->back()->with('success', 'Address Created Successfully!');
     }
     


    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddressRequest $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        //
    }
}
