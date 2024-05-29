import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  myForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService){
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }
  Login(){
    if (this.myForm.valid) {
      console.log('Form Submitted!');
      const loginData = new FormData();
      loginData.append('email', this.myForm.value.email);
      loginData.append('password', this.myForm.value.password);
      this.authService.Login(loginData); 
    } else {
      console.log('Form not valid');
    }
     
  }
  Logout() {
    this.authService.Logout();
  }
}
