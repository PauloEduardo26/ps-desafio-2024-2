<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
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
            'name' => ['sometimes', 'min:1', 'max:80'],
            'author' => ['sometimes', 'min:1', 'max:80'],
            'release_date' => ['sometimes', 'min:1', 'max:80'],
            'quantity' => ['sometimes', 'integer'],
            'image' => ['sometimes', 'image'],
            'description' => ['sometimes','min:1', 'max:80'],
            'category_id' => ['sometimes']
        ];
    }
}
