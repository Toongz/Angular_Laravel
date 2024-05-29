<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
  
    public function login(Request $request){
        
        $validator = Validator::make($request->all(),
        [
            'email' => 'required|email',
            'password' =>   'required'
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Lỗi xác nhận',
                'errors' => $validator->errors(),
            ],422);
        }
        
        if(!Auth::attempt($validator->validated())){
            return response()->json([
                'status' => false,
                'message' => 'Email hoặc mật khẩu không đúng'
            ],401);
        }
       
        $user = Auth::user();
       
        $token = $user->createToken('API TOKEN')->plainTextToken;
        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công',
            'token' => $token
        ],200);
    }

    public function register(Request $request){
       
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Vui lòng nhập lại thông tin',
                'errors' => $validator->errors()
            ],422);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),   
            'balance' => 0
        ]);
        $token = $user->createToken('API TOKEN')->plainTextToken;
        return response()->json([
            'status' => true,
            'message' => 'Tạo người dùng mới thành công',
            'token' => $token
        ],201);

    }
    public function logout(){
        auth()->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Đăng xuất thành công'
        ],204);
    }
}
