<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
            'name' => ['required', 'min:1', 'max:80'],
            'author' => ['required', 'min:1', 'max:80'],
            'release_date' => ['required', 'min:1', 'max:80'],
            'quantity' => ['required', 'integer'],
            'image' => ['required', 'image'],
            'description' => ['required','min:1', 'max:80'],
            'category_id' => ['required']
        ];
    }
}
