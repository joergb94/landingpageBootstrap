<?php

namespace App\Http\Requests\inbox;

use Illuminate\Foundation\Http\FormRequest;

class InboxCreateRequest extends FormRequest
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
            'name' => 'required|max:100',
            'email' => 'required|max:100',
            'phone' => 'integer|digits_between:10,15',
            'description' => 'required|max:200',
        ];
    }
}
