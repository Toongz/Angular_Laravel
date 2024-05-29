<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MovieAccess;

class MovieAccessController extends Controller
{
    public function countMovieAccessByUserId($user_id){
        $mAC = MovieAccess::where('user_id', $user_id)
                            ->where('status', 1)
                            ->count();
        return response()->json($mAC);
    }
    public function getMovieAccessByUserId($user_id){
        $mAC = MovieAccess::where('user_id', $user_id)
        ->where('status', 1)
        ->get();
return response()->json($mAC);
    }
}
