import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  if(authService.isAuthenticated === true){
    return true
  }else{
    router.navigateByUrl("/login");
    return false;
  }
};
