<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;

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

Route::get('/user',[AuthController::class,'GetUser'])->middleware('auth:sanctum');
Route::post('/login',[AuthController::class,'Login']);
Route::post('/register',[AuthController::class,'Register']);
Route::get('/logout',[AuthController::class,'Logout'])->middleware('auth:sanctum');


Route::get('/balance', [UserController::class,'GetBalance'])->middleware('auth:sanctum');
Route::post('/deposit',[UserController::class,'Deposit'])->middleware('auth:sanctum');
Route::post('/transaction',[UserController::class,'Payment']);

Route::get('/movies', [MovieController::class, 'index']);
Route::post('/movies', [MovieController::class, 'store']);
Route::get('/movies/{id}', [MovieController::class, 'show']);
Route::put('/movies/{id}', [MovieController::class, 'update']);
Route::delete('/movies/{id}', [MovieController::class, 'destroy']);


