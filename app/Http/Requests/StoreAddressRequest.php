<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

    return [
        'street' => 'required|string|max:255',
        'postal_code' => 'required|numeric|digits_between:1,20',
        'country' => 'required|exists:countries,id',
        'state' => 'required|exists:states,id',
        'city' => 'required|exists:cities,id',
        'user_id'=>'required|exists:users,id',
    ];


    }
}
