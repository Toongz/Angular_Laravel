import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private userService: UserService){}
  onMakePayment(userId: number, movieId: number){
    this.userService.MakePayMent(userId, movieId).subscribe(res =>{
      console.log(res);
      
    },
    (error) =>{
      console.error(error);
      
    }
    )
  }
}
