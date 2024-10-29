<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

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

    protected static function booted(){
        self::deleted(function (Book $book){
            try{
                $image_name = explode('books/', $book['image']);
                Storage::disk('public')->delete('books/'.$image_name[1]);
            }catch(Throwable){}
        });
    }

}
