<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Movie;
use App\Models\Transacsion;
use App\Models\MovieAccess;
use App\Models\Review;
use App\Models\Wishlist;

class UserController extends Controller
{
    //
    public function getUser(){
        $user = auth()->user();
        return response()->json($user,200);
    }
    public function getUserByUserId($id){
        $user = User::where(['id' => $id])->first();
        return response()->json($user);
    }
    public function isAdmin(){
        $user = auth()->user();
        if($user->isAdmin){
            return response()->json('',200);
        }
        return response()->json(['message' => 'Không phải admin'],403);
    }

    public function getBalance(Request $request){
        $user = auth()->user();
        $balance = $user->balance;
        return response()->json([
            'message' => 'Số dư tài khoản là: ' . $balance
        ]);
    }
    public function deposit(Request $request){
        $user = auth()->user();
        $balance = $user->balance;
        $amount = $request->input('amount');
        if($amount < 0){
            return response()->json(['message' => 'Nhập số dư không hợp lệ']);
        }
        $newBalance = $balance + $amount;
        $user->balance = $newBalance;
        $user->save();
        return response()->json(['message' => 'Số dư mới là: '. $newBalance]);
    }
    
    public function payment(Request $request){
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required|exists:movies,id'
        ]);
        $user = User::findOrFail($validatedData['user_id']);
        $movie = Movie::findOrFail($validatedData['movie_id']);
        if($user->balance < $movie->price){
            return response()->json([
                'message' => 'Số dư không đủ'
            ]);
        }
        DB::beginTransaction();
        try{
            $user->balance -= $movie->price;
            $user->save();
            $transaction = Transacsion::create([
                'user_id' => $user->id,
                'movie_id' => $movie->id,
                'amount' => $movie->price,
                'status' => true
            ]);
            if($transaction->status){
                $movieAccess = MovieAccess::create([
                    'user_id' => $transaction->user_id,
                    'movie_id' => $transaction->movie_id,
                    'status' => true
                ]);
            }
            DB::commit();
            return response()->json($transaction,201);
        }catch(\Exception $e){
            DB::rollback();
            return response()->json([
                'message' => 'Thanh toán không thành công',
                'error' => $e->getMessage()
            ],500);
        }
    }

    public function checkPayment(Request $request){
        $user_id = $request->input('user_id');
        $movie_id = $request->input('movie_id');

        $movie = Movie::find($movie_id);
        $isFree = $movie->price == 0 || is_null($movie->price);
        if ($isFree) {
            return response()->json(['isPaid' => true]);
        }
        $payment = MovieAccess::where('user_id', $user_id)
                                ->where('movie_id', $movie_id)
                                ->first();
        return response()->json([
            'isPaid' => !is_null($payment)
        ]);
    }

    
    
    

}
