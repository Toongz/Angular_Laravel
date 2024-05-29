import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent {
  constructor(private movieService: MovieService, private categoryService: CategoryService){}
  @Input() movie: Movie = new Movie();
  lstCategory: Category[] = [];
  selectedImage: File | null = null;
  selectedVideo: File | null = null;
  
  
  ngOnInit(): void{
   this.getCategories();
  }
  addMovie(){
   
      this.movieService.create(this.movie,this.selectedImage,this.selectedVideo).subscribe(res => {
        alert(res.toString());   
       })
    
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((data:any) => {
      this.lstCategory = data;
    });
  }
  // updateMovie(){
  //   debugger
  //    this.movieService.update(this.movie.id, this.movie, this.selectedImage, this.selectedVideo).subscribe(res => {
  //     alert(res.toString());
  //   });
  //   debugger
  // }
  updateMovie(){
    const title = this.movie.title;
    const poster = this.selectedImage;
    const film = this.selectedVideo;
    const cateory_name = this.movie.category_name;
    const price = this.movie.price;
    const description = this.movie.description;
    const formData = new FormData();
    formData.append('title', title);
    if (poster) {
      formData.append('poster', poster);
    }
    if (film) {
      formData.append('film', film);
    }
    formData.append('category_name', cateory_name);
    formData.append('price', price);
    formData.append('description', description);
    this.movieService.update(this.movie.id, formData).subscribe(res => {
      alert(res.toString());
    })
  }
  onImageChange(event: any){
    this.selectedImage = event.target.files[0]; 
  }
  onVideoChange(event: any){
    this.selectedVideo = event.target.files[0];  
  } 
}
