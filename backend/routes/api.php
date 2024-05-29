<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\MovieAccessController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')
//     ->group(function(){
//         // Movie
//         Route::apiResource('movies',MovieController::class);
//         // Categories
// });

// Auth Controller
Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'register']);
Route::get('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');

// UserController
Route::get('/user',[UserController::class,'getUser'])->middleware('auth:sanctum');
Route::get('/user/{id}',[UserController::class,'getUserByUserId']);
Route::get('/balance', [UserController::class,'getBalance'])->middleware('auth:sanctum');
Route::post('/deposit',[UserController::class,'deposit'])->middleware('auth:sanctum');
Route::post('/transaction',[UserController::class,'payment'])->middleware('auth:sanctum');
Route::get('/isAdmin',[UserController::class,'isAdmin'])->middleware('auth:sanctum','admin');
Route::post('/checkPayment',[UserController::class,'checkPayment'])->middleware('auth:sanctum');         

// ReviewController
Route::get('/movies/{movie_id}/avgreviews',[ReviewController::class,'averageRating']);
Route::get('/movies/{user_id}/countreviews',[ReviewController::class,'countReviewUser'])->middleware('auth:sanctum');
Route::get('/movies/{user_id}/getreviews',[ReviewController::class,'getReviewByUserId'])->middleware('auth:sanctum');
Route::get('/movies/{movie_id}/reviews',[ReviewController::class,'getReviewByMovieId'])->middleware('auth:sanctum');
Route::post('/movies/reviews',[ReviewController::class,'addReview'])->middleware('auth:sanctum');

// WishlistController
Route::get('user/{user_id}/countwishlist',[WishlistController::class,'countWishlist'])->middleware('auth:sanctum');
Route::get('wishlist',[WishlistController::class,'getWishlist'])->middleware('auth:sanctum');
Route::get('user/{user_id}/wishlist',[WishlistController::class,'getWishlistByUserId'])->middleware('auth:sanctum');
Route::post('/wishlist',[WishlistController::class,'addWishlist'])->middleware('auth:sanctum');
Route::delete('/wishlist',[WishlistController::class,'deleteWishlist'])->middleware('auth:sanctum');
Route::get('/checkWishlist',[WishlistController::class,'checkWishlist'])->middleware('auth:sanctum');
// MovieAccessController
Route::get('/movieaccess/{user_id}/count',[MovieAccessController::class,'countMovieAccessByUserId'])->middleware('auth:sanctum');
Route::get('/movieaccess/{user_id}',[MovieAccessController::class,'getMovieAccessByUserId'])->middleware('auth:sanctum');

// CategoryController
Route::get('/category/{id}',[CategoryController::class,'getCategoryById']);
Route::get('/categories',[CategoryController::class,'getCategories']);
Route::post('/categories',[CategoryController::class,'addCategory']);
Route::delete('/categories/{id}',[CategoryController::class,'deleteCategory']);



// MovieController
Route::get('/movies', [MovieController::class, 'index']);
Route::post('/movies', [MovieController::class, 'store']);
Route::get('/movies/{id}', [MovieController::class, 'show']);
Route::put('/movies/{id}', [MovieController::class, 'update']);
Route::delete('/movies/{id}', [MovieController::class, 'destroy']);
Route::get('/filter', [MovieController::class, 'filter']);
Route::get('movieFree', [MovieController::class, 'getFreeMovies']);
Route::get('/moviePaid', [MovieController::class, 'getPaidMovies']);



