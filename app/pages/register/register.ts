import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true
})
export class Register {
  newData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  constructor(private authService: Auth, private router: Router) {}
  onSubmit(){
    if(this.newData.password !== this.newData.confirmPassword){
      alert("password doesn't match!");
      return;
    }
    this.authService.register(this.newData).subscribe({
      next: (res:any)=>{
        alert("Registration Successful");
        this.router.navigate(['/login']);
      },
      error: (err)=>{
        alert("Registration failed!");
        console.log(err);
      }
    })
  }
}
