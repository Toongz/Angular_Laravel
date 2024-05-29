<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Movie;
use App\Models\Review;

class ReviewController extends Controller
{
    //
    public function averageRating($movie_id){
        // count average rating of movie
        $avgReview = Review::where('movie_id',$movie_id)
                            ->avg('rating');
        // change format
        $formatted = number_format($avgReview, 2, '.', '');
        return response()->json($formatted, 200);
    }
    public function getReviewByMovieId($movie_id){
        $reviewMovie = Review::where('movie_id',$movie_id)->get();
        return response()->json($reviewMovie,200);
    }
    public function getReviewByUserId($user_id){
        $reviewUser = Review::where('user_id',$user_id)->get();
        return response()->json($reviewUser,200);
    }
    public function countReviewUser($user_id){
        $countReview = Review::where('user_id',$user_id)->count();
        return response()->json($countReview,200);
    }
    public function addReview(Request $request){
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required|exists:movies,id',
            'rate_content' => 'nullable',
            'rating' => 'required'
        ]); 
        $user = User::findOrFail($validatedData['user_id']);
        $movie = Movie::findOrFail($validatedData['movie_id']);
        $rate_content = $request->rate_content;
        $rating = $request->rating;
        $review = Review::create([
            'user_id' => $user->id,
            'movie_id' => $movie->id,
            'rate_content' => $rate_content,
            'rating' => $rating
        ]);
        return response()->json($review,201);
    }
}
