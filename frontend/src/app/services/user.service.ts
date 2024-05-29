import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }
getUser(): Observable<any>{
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get<any>(`${this.apiUrl}/user`,{headers})
      .pipe(
        catchError(() => {
          return of(null); // Don't throw error, let observable complete
        })
      );
    }
    else{
      return of(null);
    }
}
getUserByUserId(id: number): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/user/${id}`);     
}
getBalance(): Observable<any>{
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
deposit(amount: number): Observable<any>{
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

makePayMent(userId: number, movieId: number): Observable<any>{
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
// Review
submitRating(user_id: number, movie_id: number, rate_content: string, rating: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  const data = {user_id, movie_id, rate_content, rating}
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(`${this.apiUrl}/movies/reviews`, data, {headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}
getReviewByMovieId(movie_id: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.apiUrl}/movies/${movie_id}/reviews`,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}
getAvgRating(movie_id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/movies/${movie_id}/avgreviews`);
}
getReviewByUserId(user_id: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.apiUrl}/movies/${user_id}/getreviews`,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}
// Wishlist
getWishlistByUserId(user_id: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.apiUrl}/user/${user_id}/wishlist`,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}
addWishlist(userId: number, movieId: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  const data = {user_id: userId, movie_id: movieId}
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(`${this.apiUrl}/wishlist`,data,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}
deleteWishlist(userId: number, movieId: number): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  const url = `${this.apiUrl}/wishlist?user_id=${userId}&movie_id=${movieId}`;
  return this.http.delete(url, { headers: headers });
}

getCountWishlist(userId: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.apiUrl}/user/${userId}/countwishlist`,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}
checkWishlist(userId: number, movieId: number){
  const token = localStorage.getItem('access_token');
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.apiUrl}/checkWishlist?user_id=${userId}&movie_id=${movieId}`;
    return this.http.get(url,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}

// MovieAccess
getCountMovieAccessByUserId(userId: number): Observable<any>{
  const token = localStorage.getItem('access_token');
  if(token){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.apiUrl}/movieaccess/${userId}/count`,{headers});
  }
  else{
    console.error('Token not avaible');
    return new Observable();
  }
}
  getMovieAccessByUserId(userId: number): Observable<any>{
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      
      return this.http.get(`${this.apiUrl}/movieaccess/${userId}`,{headers});
    }
    else{
      console.error('Token not avaible');
      return new Observable();
    }
  }

  checkPayment(user_id: number, movie_id: number): Observable<any>{
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      
      return this.http.post(`${this.apiUrl}/checkPayment`,{ user_id, movie_id }, {headers});
    }
    else{
      console.error('Token not avaible');
      return new Observable();
    }
  }








 

}
  



