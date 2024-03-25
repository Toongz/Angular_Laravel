import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

  GetMovies(){
    return this.http.get('http://localhost:8000/api/movies');
  }
  GetMovieById(id: any){
    return this.http.get('http://localhost:8000/api/movies/' + id);
  }
  Create(movie: any, image: File | null): Observable<any> {
    const formData = new FormData();
    if(image){
      formData.append('title',movie.title);
      formData.append('poster', movie.poster);
      formData.append('category_name', movie.category_name);
      formData.append('price', movie.price);
      formData.append('description',movie.description);
    }
    return this.http.post('http://localhost:8000/api/movies',formData);
  }
  Update(id: any, movie: any){
    return this.http.put('http://localhost:8000/api/movies/'+id, movie);
  }
  Delete(id: any){
    return this.http.delete('http://localhost:8000/api/movies/'+id);
  }

}
