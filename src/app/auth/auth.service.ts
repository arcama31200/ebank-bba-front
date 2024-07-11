// auth.service.ts
import { Injectable} from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles : any;
  username: any;
  access_token!: any;
  constructor(private http: HttpClient){}
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
    console.log("valeur de this.roles", this.roles);
  
  }
  public logout(){
    this.isAuthenticated = false;
    this.access_token = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
  
}
