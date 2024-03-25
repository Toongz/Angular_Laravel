<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieAccess extends Model
{
    protected $fillable = ['user_id', 'movie_id', 'status'];
    use HasFactory;
    public function users(){
        return $this->belongsTo(User::class);
    }
    public function movies(){
        return $this->belongsTo(Movie::class);
    }
}
