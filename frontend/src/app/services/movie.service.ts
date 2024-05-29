import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  readonly APIUrl="http://localhost:8000/api";

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/movies`);
  }
  
  // splitMovies(movies: any[]) : { moviePaid: any[], movieFree: any[] } {
  //   const moviePaid: any[] = [];
  //   const movieFree: any[] = [];
  //   movies.forEach(movie => {
  //     if(movie.price && movie.price > 0){
  //       moviePaid.push(movie);
  //     }
  //     else{
  //       movieFree.push(movie);
  //     }
  //   });
  //   return {movieFree, moviePaid};
  // }
  getFreeMovies(page: number): Observable<any> {
    return this.http.get(`${this.APIUrl}/movieFree?page=${page}`);
  }

  getPaidMovies(page: number): Observable<any> {
    return this.http.get(`${this.APIUrl}/moviePaid?page=${page}`);
  }
  getMovieById(id: any){
    return this.http.get(`${this.APIUrl}/movies/${id}`);
  }
  create(movie: any,poster: File|null, film: File| null): Observable<any> {
    const formData = new FormData();
  formData.append('title', movie.title);
  if (poster) {
    formData.append('poster', poster);
  }
  if (film) {
    formData.append('film', film);
  }
  formData.append('category_name', movie.category_name);
  formData.append('price', movie.price.toString());
  formData.append('description', movie.description);
    
    return this.http.post(`${this.APIUrl}/movies`,formData);
  }
  
  // update(id: any, movie: any, poster: File|null, film: File|null): Observable<any> {
  //   debugger
  //   const formData = new FormData();
  // formData.append('title', movie.title);
  // if (poster) {
  //   formData.append('poster', poster);
  // }
  // if (film) {
  //   formData.append('film', film);
  // }
  // formData.append('category_name', movie.category_name);
  // formData.append('price', movie.price);
  // formData.append('description', movie.description);
  // debugger
  // return this.http.put(`${this.APIUrl}/movies/${id}`, formData);
  
  // }
  update(id: any, formData: FormData): Observable<any> {
    return this.http.put(`${this.APIUrl}/movies/${id}`, formData);
  }

  delete(id: any){
    return this.http.delete(`${this.APIUrl}/movies/${id}`);
  }
  getMoviesByFilter(filters: any): Observable<any> {
    let params = new HttpParams();
    if(filters.tag){
      params = params.append('tag', filters.tag);
    }
    if(filters.search){
      params = params.append('search', filters.search);
    }
    
    return this.http.get(`${this.APIUrl}/filter`, {params: params}); 
  }





}
