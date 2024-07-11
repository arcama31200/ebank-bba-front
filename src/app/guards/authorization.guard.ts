import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  if(authService.roles.includes("ADMIN")){
    return true;
  }else{
    router.navigateByUrl("/admin/notAuthorized")
    return false;
  }
};
