import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-watch-movie',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.css']
})
export class WatchMovieComponent implements OnInit {
  id: any;
  reviews: any;
  userRating: any;
 userComment: any;
 movie: Movie = new Movie();
  constructor(private route: ActivatedRoute, private userService: UserService, private movieService: MovieService){}

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.getMovie();
    this.getReviewByMovieId();
    
  }
  
  getReviewByMovieId(){
    this.userService.getReviewByMovieId(this.id).subscribe(res => {
      this.reviews = res.map((review: any) => {
        this.userService.getUserByUserId(review.user_id).subscribe(user => {
          review.user = user;
        })
        return review;
      });
    })
  }


  getMovie(){
    this.movieService.getMovieById(this.id).subscribe((movie: any) => {
      this.movie = movie;
    })
  }


  submitRating(){
    this.userService.getUser().subscribe(user => {
      const user_id = user.id; 
      this.userService.submitRating(user_id,this.id,this.userComment,this.userRating).subscribe(res => {
        console.log("Comment submitted");
      },
    error =>{
      console.error('Error submitting rating',error);
    });
  });
}
}
