import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
  export class DetailComponent {
    id :any;
    rating!: any;
    isPaid!: boolean ;
    movie = new Movie();
    isWishlist = false;

    constructor(private route:ActivatedRoute,
      private movieService: MovieService,
      private userService: UserService,
      private categoryService: CategoryService,
      ){}
    ngOnInit(){ 
      this.id = this.route.snapshot.params['id'];
      this.checkPayment();
      this.getMovie();
      this.getAvgRating();
      this.checkWishlist();
      
    }
    getMovie(){
      this.movieService.getMovieById(this.id).subscribe((res:any) => {
        this.movie = res;
        this.categoryService.getCategoryById(this.movie.category_id).subscribe(category =>  {
          this.movie.category_name = category.category_name;
        })
      })
    }
    getAvgRating(){
      this.userService.getAvgRating(this.id).subscribe((res: any) => {
        this.rating = res;
      })
    }
    addWishlist(){
      this.userService.getUser().subscribe((res: any) => {
        const user_id = res.id;
        // Bạn cần phải subscribe tới kết quả của addWishlist
        this.userService.addWishlist(user_id, this.id).subscribe(
          (addResponse) => {
            // Cập nhật thành công, đặt isWishlist thành true để phản ánh trạng thái mới của giao diện
            this.isWishlist = true;
            // Có thể hiển thị thông báo hoặc cập nhật giao diện tại đây nếu cần
          },
          (error) => {
            // Xử lý lỗi ở đây
            console.error('Error adding to wishlist', error);
            // Có thể hiển thị thông báo lỗi tại đây nếu cần
          }
        );
      });
    }
    deleteWishlist(){
      this.userService.getUser().subscribe((res: any) => {
        const user_id = res.id;
        // Cần phải subscribe để thực thi và nhận kết quả từ API call
        this.userService.deleteWishlist(user_id, this.id).subscribe(
          (deleteResponse) => {
            // Xóa thành công, cập nhật trạng thái isWishlist để phản ánh việc này trên giao diện
            this.isWishlist = false;
            // Thông báo xóa thành công hoặc cập nhật giao diện nếu cần
          },
          (error) => {
            // Xử lý lỗi tại đây
            console.error('Error deleting from wishlist', error);
            // Thông báo lỗi có thể hiện ở đây nếu cần
          }
        );
      });
    }
    checkWishlist(){
      this.userService.getUser().subscribe((res: any) => {
        const user_id = res.id;
        // Cần phải subscribe để thực thi và nhận kết quả từ API call
        this.userService.checkWishlist(user_id, this.id).subscribe(
          (res: any) => {
            // Xóa thành công, cập nhật trạng thái isWishlist để phản ánh việc này trên giao diện
            this.isWishlist = res;
            // Thông báo xóa thành công hoặc cập nhật giao diện nếu cần
          },
          (error) => {
            // Xử lý lỗi tại đây
            console.error('Error deleting from wishlist', error);
            // Thông báo lỗi có thể hiện ở đây nếu cần
          }
        );
      });
    }
    payment() {
      if (window.confirm('Bạn có chắc chắn muốn thanh toán?')) {
        this.userService.getUser().subscribe(user => {
          const user_id = user.id; 
          this.userService.makePayMent(user_id, this.id).subscribe(res => {
            console.log(res);
          });
        }, error => {
          console.error('Không thể lấy dữ liệu người dùng', error);
        });
      } else {
        console.log('Thanh toán đã bị hủy bởi người dùng.');
      }
    }
    checkPayment(){
      this.userService.getUser().subscribe(user => {
        const user_id = user.id; 
          this.userService.checkPayment(user_id, this.id).subscribe(res => {
            this.isPaid = res.isPaid;
            console.log(this.isPaid);
          });
        
      });

    }
    

  }
