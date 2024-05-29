<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'movie_id',
    ];
    public function users(){
        return $this->belongsTo(User::class);
    }
    public function movies(){
        return $this->belongsTo(Movie::class);
    }
}
