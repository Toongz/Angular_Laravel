import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieAccess } from 'src/app/models/movie-access';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { Wishlist } from 'src/app/models/wishlist';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id!: number
  user: User = new User();
  amount!: number
  countWishlist: any;
  countMovieAccess: any;
  checkStatusPayment: boolean = false;
  lstReview: Review[] = [];
  lstMovieAccess: MovieAccess[] = [];
  lstWishlist: Wishlist[] = [];
  data: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private movieService: MovieService){}
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getUser();
    this.getMovieAccessByUserId();
    this.getCountMovieAccessByUserId();
    this.getCountWishlist();
    this.getReviewByUserId();
    this.getWishlist();
  
  }
  
  Deposite(){
    this.userService.deposit(this.amount).subscribe(res => {
      console.log(res);
    })
    this.getUser();
  }
  getUser(){
    this.userService.getUser().subscribe(user => {
      this.user = user;
    })
  }
  
  getReviewByUserId() {
    this.userService.getUser().subscribe(user => {
      this.userService.getReviewByUserId(user.id).subscribe(reviews => {
        this.lstReview = reviews.map((review: any) => {
          this.movieService.getMovieById(review.movie_id).subscribe(movie => {
            review.movie = movie;
          });
          return review;
        });
      });
    });
  }
  getWishlist(){  
    this.userService.getUser().subscribe(user => {
      const user_id = user.id;
      this.userService.getWishlistByUserId(user_id).subscribe(res => {
        this.lstWishlist = res.map((wishlist: any) => {
          this.movieService.getMovieById(wishlist.movie_id).subscribe(movie => {
            wishlist.movie = movie;
          });

          return wishlist;
        });
      })
    })
  }
  getCountWishlist(){
    this.userService.getUser().subscribe(user => {
      const user_id = user.id;
      this.userService.getCountWishlist(user_id).subscribe(res => {
        this.countWishlist = res;
     })
    })
  }
  getCountMovieAccessByUserId(){
    this.userService.getUser().subscribe(user => {
      const user_id = user.id;
      this.userService.getCountMovieAccessByUserId(user_id).subscribe(res => {
        this.countMovieAccess = res;
      })
    })  
  }

  getMovieAccessByUserId(){
    this.userService.getUser().subscribe(user => {
      const user_id = user.id;
      this.userService.getMovieAccessByUserId(user_id).subscribe((res:any) => {
        this.lstMovieAccess = res.map((ma: any) => {
          this.movieService.getMovieById(ma.movie_id).subscribe(movie => {
            ma.movie = movie;
          });
          return ma;
      })
    })
    })
  }
  
  
}  