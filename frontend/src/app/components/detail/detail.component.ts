import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  id :any;
  movie = new Movie();

  constructor(private route:ActivatedRoute,private movieService: MovieService,private userService: UserService){}
  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.GetMovie();
  }
  GetMovie(){
    this.movieService.GetMovieById(this.id).subscribe((res:any) => {
      this.movie = res;
      
    })
  }
  Payment() {
    this.userService.GetUser().subscribe(user => {
      const user_id = user.id; 
        this.userService.MakePayMent(user_id, this.id).subscribe(res => {
          console.log(res);
        });
      
    }, error => {
      console.error('Could not retrieve user data', error);
    });
  }

}
