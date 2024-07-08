import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private authService: AuthService, private router: Router){}

  logout(): void{
    this.authService.logout();
  }

  isLoggedIn(): boolean{
    return this.authService.isAuthenticated();
  }

  getUserName(): string | null{
    return this.authService.getUsername();
  }
}
