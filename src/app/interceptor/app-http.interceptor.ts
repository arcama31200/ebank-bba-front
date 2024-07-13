import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, finalize, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const appHttpInterceptor: HttpInterceptorFn = (request, next) => {
  let authService = inject(AuthService);
  if(!request.url.includes("/auth/login")){
    let newRequest =request.clone({
      headers : request.headers.set('Authorization', 'Bearer ' + authService.access_token)
    });
    return next(newRequest);
  }else{
    return next(request).pipe(
        catchError(err =>{
          if(err.status===401){
            authService.logout();
          }
          return throwError(()=>new Error(err.message))
        })
      )
  }
};
