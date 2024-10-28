<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Power extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name', //diz que a classe Power so vai ter uma coluna na tabela, o nome da coluna é name
    ];

    public function mutants(){
        return $this->hasMany(Mutant::class, 'power_id', 'id');
    }

    protected static function booted(){
        self::deleting(function (Power $power){
            $power->mutants()->each(function ($mutant){
                $mutant->delete();
            });
        });
    }
}
