import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  loginData={
    username:'',
    password: ''
  }
  constructor(private authService:Auth, private router:Router){}
  onSubmit(){
    this.authService.login(this.loginData).subscribe({
      next: (res: any)=>{
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err)=>{
        alert('Login failed! sahi info dalo bhai');
        console.log(err);
      }
    });
  }
}
