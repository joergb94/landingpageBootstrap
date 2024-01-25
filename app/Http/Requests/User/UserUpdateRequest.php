<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(Request $request)
    {
        return validateAccess(Auth::user(),2,$request->location); 
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        return [
            'type' => 'required',
            'name' => 'required|max:40',
            'last_name' => 'required|max:40',
            'email' => 'required|unique:users,email,'.$request['id'],
            'phone' => 'integer|digits_between:10,15',
        ];
    }
}
