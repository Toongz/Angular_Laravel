import { Component } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.css']
})
export class ShowMovieComponent {
  constructor(private movieService: MovieService){}

  MovieList:any = [];

  ModalTitle: string = "";
  ActivateAddEditMovieComp: boolean = false;
  movie: Movie = new Movie();

  filterKey: string = "";
  MovieListWithoutFilter: any = [];
  sortColumn: string = "";
  sortAscending: boolean = true;
  ngOnInit(){

    
    this.refreshMovieList();
  }

  addClick(){
    this.ModalTitle = "Add movie";
    this.ActivateAddEditMovieComp = true;
  }

  editClick(id: any){
    this.movieService.getMovieById(id).subscribe((movie: any) => {
      this.movie = movie;
      
      
    });
    this.ModalTitle = "Edit movie";
    this.ActivateAddEditMovieComp = true;
  }
  deleteClick(item: any){
    if(confirm("Are you sure?")){
      this.movieService.delete(item).subscribe(data => {
        alert(JSON.stringify(data));
        this.refreshMovieList();
      });
    }
  }
  closeClick(){
    this.ActivateAddEditMovieComp=false;
    
    this.refreshMovieList();
    this.movie = new Movie();
  }
  refreshMovieList(){
    this.movieService.getAll().subscribe(data => {
      this.MovieList = data;
      this.MovieListWithoutFilter = data;
    })
  }

  FilterFn() {
    // Giả sử `filterKey` là từ khóa bạn muốn sử dụng để lọc
    var filterKey = this.filterKey.toLowerCase().trim();
  
    this.MovieList = this.MovieListWithoutFilter.filter(function (el: any) {
      // Cập nhật lọc để kiểm tra cả tiêu đề và mô tả hoặc bất kì trường nào khác bạn muốn
      return el.title.toLowerCase().includes(filterKey) || 
             el.description.toLowerCase().includes(filterKey); // Thêm điều kiện lọc cho mô tả hoặc trường mong muốn
    })
  }

  sortResult(prop: string, asc: boolean) {
    this.MovieList = this.MovieListWithoutFilter.sort((a: any, b: any) => {
      // Xử lý trường hợp khi prop chứa dấu chấm
      let aProp = prop.split('.').reduce((o, k) => (o || {})[k], a);
      let bProp = prop.split('.').reduce((o, k) => (o || {})[k], b);
  
      if (asc) {
        return (aProp > bProp) ? 1 : ((aProp < bProp) ? -1 : 0);
      } else {
        return (bProp > aProp) ? 1 : ((bProp < aProp) ? -1 : 0);
      }
    });
  }
  toggleSort(prop: string) {
    if (this.sortColumn === prop) {
      // Đảo ngược thứ tự sắp xếp nếu cột đã chọn hiện tại được nhấn lại
      this.sortAscending = !this.sortAscending;
    } else {
      // Nếu một cột khác được chọn, thì sắp xếp theo thứ tự tăng dần
      this.sortAscending = true;
    }
    this.sortColumn = prop;
    // Thực hiện hàm sắp xếp
    this.sortResult(prop, this.sortAscending);
  }
  getSortIcon(column: string) {
    if (this.sortColumn !== column) {
      return 'fa-sort'; // default sort icon when the column isn't actively being sorted
    }
    return this.sortAscending ? 'fa-sort-asc' : 'fa-sort-desc';
  }
}
