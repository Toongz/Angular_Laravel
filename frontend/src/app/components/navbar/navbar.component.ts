import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: any;
  user: User = new User();
  searchKey: string = '';
  lstMovie: Movie[] = [];
  lstCategory: Category[] = [];
  constructor(private router: Router , private userService: UserService, private authService: AuthService, private movieService: MovieService, private categoryService: CategoryService){}
  
  ngOnInit(){
    this.getCategories();
    this.getLoginStatus();
    this.getUser();
  }
  getUser(){
    this.userService.getUser().subscribe(user => {
      this.user = user;
    })
  }

  getLoginStatus() {
    const loginStatus = localStorage.getItem('loginStatus');
    this.isLoggedIn = loginStatus !== null ? loginStatus : false; 
  }
  logout() {
    this.authService.Logout();
  }
  redirectLogin() {
    this.authService.RedirectLogin();
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((categories:any) => {
      this.lstCategory = categories;
    })
  }

  searchMovies(searchTerm: string) {
    this.movieService.getMoviesByFilter({ search: searchTerm }).subscribe(
      data => {
        this.lstMovie = data;
        if (this.searchKey.trim()) {
          this.router.navigate(['/search'], { queryParams: { q: this.searchKey } });
          this.searchKey = ''; 
        }
      },
      error => {
        console.error('Có lỗi xảy ra trong quá trình tìm kiếm', error);
      }
    );
  }
  getMoviesByCategoryName(searchTerm: string){
    this.movieService.getMoviesByFilter({ tag: searchTerm }).subscribe(
      data => {
        this.lstMovie = data.movies;
        console.log(data);
        
          this.router.navigate(['/search'], { queryParams: { s: searchTerm } });
      },
      error => {
        console.error('Có lỗi xảy ra trong quá trình tìm kiếm', error);
      }
    );
  }

 


}
