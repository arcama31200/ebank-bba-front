import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (request, next) => {
  console.log("requrl ", request.url);
  if(!request.url.includes("/auth/login")){
    let authService = inject(AuthService);
    let newRequest =request.clone({
      headers : request.headers.set('Authorization', 'Bearer ' + authService.access_token)
    });
    return next(newRequest);
  }else{
    return next(request);
  }

};
