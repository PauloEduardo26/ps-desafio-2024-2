<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'name',
        'author',
        'release_date',
        'description',
        'quantity',
        'image',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
