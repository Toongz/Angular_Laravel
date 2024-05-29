import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  lstMovie: Movie[] = [];

  constructor(private activatedRoute: ActivatedRoute , private movieService: MovieService) { }
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      const searchKey = params['q'];
      if(searchKey){
        this.movieService.getMoviesByFilter({search: searchKey}).subscribe((movies:any) => {
          this.lstMovie = movies.movies;          
        });
      }
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const searchKey = params['s'];
      if(searchKey){
        this.movieService.getMoviesByFilter({tag: searchKey}).subscribe((movies:any) => {
          this.lstMovie = movies.movies;          
        });
      }
    });

  }



}
