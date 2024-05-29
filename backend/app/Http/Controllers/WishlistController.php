<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\User;
use App\Models\Movie;
class WishlistController extends Controller
{
    //
    public function countWishlist($user_id){
        $countWishlist = Wishlist::where('user_id',$user_id)
                            ->count();
        return response()->json($countWishlist, 200);
    }
    public function getWishlist(Request $request){
        // Sử dụng phương thức input() để lấy data một cách an toàn
        $wishlist = Wishlist::where('user_id', $request->input('user_id'))
                             ->where('movie_id', $request->input('movie_id'))
                             ->first();
        
        // Kiểm tra nếu $wishlist tồn tại trước khi trả về kết quả
        if ($wishlist) {
            return response()->json($wishlist);
        } else {
            return response()->json(['message' => 'Wishlist item not found'], 404);
        }
    }
    
    public function getWishlistByUserId($user_id){
        $wishlist = Wishlist::where('user_id',$user_id)->get();
        return response()->json($wishlist,200);
    }
    public function addWishlist(Request $request){
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required|exists:movies,id'
        ]);
        $user = User::findOrFail($validatedData['user_id']);
        $movie = Movie::findOrFail($validatedData['movie_id']);
        $wishlist = Wishlist::create([
            'user_id' => $user->id,
            'movie_id' => $movie->id
        ]);
        return response()->json($wishlist,201);
    }
    public function deleteWishlist(Request $request){
        $wishlist = Wishlist::where('user_id', $request->input('user_id'))
                            ->where('movie_id', $request->input('movie_id'))
                            ->first();
        $wishlist->delete();
        return response()->json(null,204);
    }
    public function checkWishlist(Request $request){
        $wishlist = Wishlist::where('user_id', $request->input('user_id'))
                            ->where('movie_id', $request->input('movie_id'))
                            ->exists();
        return response()->json($wishlist, 200);
    }
}
