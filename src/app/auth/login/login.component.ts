import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  handleLogin(){
    let username = this.loginForm.value.username;
    let pwd = this.loginForm.value.password;
    this.authService.login(username, pwd).subscribe({
      next: data=>{
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error: err => console.log(err)
    })
  }
}