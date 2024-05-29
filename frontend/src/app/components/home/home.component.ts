import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn:any;
  movies: Movie[] = [];
  movieSearch: Movie[] = [];
  user: User = new User();
  moviesFree: Movie[] = [];
  moviesPaid: Movie[] = [];
  categories: Category[] = [];
  searchKey: string = '';
  filters = {
    tag: '',
    search: ''
  };
  currentPagePaid: number = 1;
  currentPageFree: number = 1;
  totalPagesPaid: number = 0;
  totalPagesFree: number = 0;
  constructor(private movieService: MovieService, private authService: AuthService, private userService: UserService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.getLoginStatus();
    this.getUser();
    this.getFreeMovies();
    this.getPaidMovies();
    // this.getMovies();
    this.getCategories();  
  }
  getLoginStatus() {
    const loginStatus = localStorage.getItem('loginStatus');
    this.isLoggedIn = loginStatus !== null ? loginStatus : false; 
  }
  getUser() {
    return this.userService.getUser().subscribe(user => {
      this.user = user;
    })
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((categories:any) => {
      this.categories = categories;
    })
  }
  

  
  Logout() {
    this.authService.Logout();
    this.authService.RedirectLogin();
  }
  RedirectLogin() {
    this.authService.RedirectLogin();
  }
  loadMoviesByCategory(categoryName: any){
    this.filters.tag = categoryName;
    this.movieService.getMoviesByFilter({tag: categoryName}).subscribe((movies:any) => {
      this.movieSearch = movies.movies;
    })
    
  }

  onSearch(searchKey: any) {
    if(!this.movieSearch) return;
    console.log('Đang tìm kiếm:', this.movieSearch);
    this.filters.search = searchKey;
    this.movieService.getMoviesByFilter({search: searchKey}).subscribe((movies:any) => {
      this.movieSearch = movies.movies; 
    })
  }

  // getMovies(){
  //   this.movieService.getMovies(this.currentPage).subscribe((movies:any) => {
  //     // this.movies = movies.data;
  //     // this.totalPages = movies.last_page;
  //     const { moviePaid, movieFree } = this.movieService.splitMovies(movies.data);
  //     this.moviesPaid = moviePaid;
  //     this.moviesFree = movieFree;
  //     this.totalPages = movies.last_page;
      

  //   })
  // }
  getFreeMovies(){
    this.movieService.getFreeMovies(this.currentPageFree).subscribe((moviesFree: any) => {
      this.moviesFree = moviesFree.data;
      this.totalPagesFree = moviesFree.last_page;
    })
  }
  getPaidMovies(){
    this.movieService.getPaidMovies(this.currentPagePaid).subscribe((moviesPaid: any) => {
      this.moviesPaid = moviesPaid.data;
      this.totalPagesPaid = moviesPaid.last_page;
    })
  }

  prevPage() {
    if (this.currentPageFree > 1) {
      this.currentPageFree--;
      this.getFreeMovies();
    }
    if (this.currentPagePaid > 1) {
      this.currentPagePaid--;
      this.getPaidMovies();
    }
  }

  nextPage() {
    if (this.currentPageFree < this.totalPagesFree) {
      this.currentPageFree++;
      this.getFreeMovies();
    }
    if (this.currentPagePaid < this.totalPagesPaid) {
      this.currentPagePaid++;
      this.getPaidMovies();
    }
  }


}




