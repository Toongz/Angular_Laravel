import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  GetUser(): Observable<any>{
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get(`${this.apiUrl}/user`,{headers});
    }
    else{
      console.error('Token not avaible');
      return new Observable();
    }
  }

  GetBalance(): Observable<any>{
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get(`${this.apiUrl}/balance`,{headers});
    }
    else{
      console.error('Token not avaible');
      return new Observable();
    }
  }
  Deposit(amount: number): Observable<any>{
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.post(`${this.apiUrl}/deposit`,{amount},{headers});
    }
    else{
      console.error('Token not avaible');
      return new Observable();
    }
}

MakePayMent(userId: number, movieId: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  const paymentData = {user_id: userId, movie_id: movieId}
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(`${this.apiUrl}/transaction`,paymentData,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}

    
}
  

