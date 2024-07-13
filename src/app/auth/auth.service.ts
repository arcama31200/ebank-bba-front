// auth.service.ts
import { Inject, Injectable, InjectionToken, PLATFORM_ID} from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles : any;
  username: any;
  access_token!: any;
  constructor(private http: HttpClient, private router: Router,  @Inject(PLATFORM_ID) private platformId: any,
  @Inject(LOCALSTORAGE) private localStorage: Storage | null) {
  }
  public login(username: string, password: string){
    let params =  new HttpParams().set("username", username).set("password", password);
    let options = {
      headers : new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    return this.http.post(environment.ebankApiUrl + "/auth/login", params, options);
  }
  public loadProfile(data: any){
    this.isAuthenticated = true;
    this.access_token = data['access-token'];
    console.log("valeur de this.azccesstoken", data);
    let decodedJwt:any = jwtDecode(this.access_token);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    this.localStorage?.setItem("jwt-token", this.access_token);
  
  }
  public logout(){
    this.isAuthenticated = false;
    this.access_token = undefined;
    this.username = undefined;
    this.roles = undefined;
    this.localStorage?.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }
  public loadJwtTokenFromLocalStorage(){
    let token = this.localStorage?.getItem("jwt-token");
    if(token){
      this.loadProfile({"access-token" : token});
      this.router.navigateByUrl("/admin/clients");
    }    
  }
  
}

export const LOCALSTORAGE = new InjectionToken<Storage | null>('LocalStorage', {
  providedIn: 'root',
  factory: () => (typeof window !== 'undefined' ? window.localStorage : null)
});