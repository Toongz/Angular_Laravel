import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginSubscription!: Subscription;
  constructor(private httpClient: HttpClient,private router: Router) { }
  
  GetUser(){
    return this.httpClient.get('http://127.0.0.1:8000/api/user');
  }
  Login(user: User){
    const formData = new FormData();
    formData.append('email',user.email);
    formData.append('password',user.password);
    this.loginSubscription = this.httpClient.post('http://127.0.0.1:8000/api/login',formData).subscribe((res:any) => {
    if(res.token){
    localStorage.setItem('access_token',res.token);
     this.router.navigate(['/home']);
      }
    else{
      console.log('Không tìm thấy token');
      }
    },
    error => {
      console.error('Đã xảy ra lỗi trong quá trình đăng nhập');
    }
    );
  }
  Logout() {
    // Xóa thông tin người dùng trong localStorage hoặc cookie
    localStorage.removeItem('access_token');

    // Hủy bất kỳ Subscription nào liên quan tới người dùng
    // if (this.userSubscription) {
    //     this.userSubscription.unsubscribe();
    // }
    // ... xử lý thêm các bước khác cần thiết khi đăng xuất
  }
  CancelLogin() {
    if (this.loginSubscription) {
        this.loginSubscription.unsubscribe();
    }
  }

}
