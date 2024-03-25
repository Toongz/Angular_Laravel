import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  movies: any;
 
  constructor(private movieService: MovieService){}
  ngOnInit(){
    this.GetMovies();
    console.log(this.movies);
    
  }
  GetMovies(){
    this.movieService.GetMovies().subscribe(res =>{
      this.movies = res;
    })
  }
}
