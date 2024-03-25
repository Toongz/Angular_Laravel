<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = ['title','poster','category_id','price','description'];
    use HasFactory;
    public function categories(){
        return $this->belongsToMany(Category::class,'movie_categories');
    }
    public function accesses(){
        return $this->hasMany(MovieAccess::class);
    }
    public function transactions(){
        return $this->hasMany(Transaction::class);
    }

}
