import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, Subscription, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSubscription!: Subscription;
  
  private apiUrl = 'http://localhost:8000/api';
  constructor(private httpClient: HttpClient,private router: Router) {
  }
  Login(formData: FormData) {
    this.loginSubscription = this.httpClient.post('http://127.0.0.1:8000/api/login', formData).subscribe(
        (res: any) => {
            if (res.token) {
                localStorage.setItem('access_token', res.token);
                localStorage.setItem('loginStatus', 'true');
                if(this.isAdmin()){
                  this.router.navigate(['/movie-manage'])
                }
                this.router.navigate(['/']);
            } else {
                console.log('Không tìm thấy token');
                localStorage.setItem('loginStatus', 'false');
            }
        },
        error => {
            console.error(error.message);
            localStorage.setItem('loginStatus', 'false');
        }
    );
}
  GetUser(): Observable<any>{
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.httpClient.get(`${this.apiUrl}/user`,{headers});
    }
    else{
      console.error('Token not avaible');
      return new Observable();
    }
  }
  isAdmin(): Observable<boolean> {
    return this.httpClient.get('http://127.0.0.1:8000/api/isAdmin', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        observe: 'response'
    }).pipe(
        map(response => response.status === 200),
        catchError(error => { 
          console.error('Error checking admin status:', error);
          return of(false); // Log và trả về false nếu có lỗi
        })
    );
  }
  Logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('loginStatus');
    this.router.navigate(['/login']);

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
  RedirectLogin(){
    this.router.navigate(['/login']);
  }

  


 
}


