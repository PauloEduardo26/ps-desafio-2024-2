<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Mutant extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'name',
        'age',
        'alias',
        'image',
        'power_id'
    ];

    public function power(){
        return $this->belongsTo(Power::class, 'power_id', 'id');
        //relaciona a classe power com mutante, sendo mutante dependente de power
    }

    protected static function booted(){
        self::deleted(function (Mutant $mutant){
            try{
                $image_name = explode('mutants/', $mutant['image']);
                Storage::disk('public')->delete('mutants/'.$image_name[1]);
            }catch(Throwable){}

        });
    }
}
