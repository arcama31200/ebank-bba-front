import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }
  private http = inject(HttpClient);
  
  public getCustomers(): Observable<Client[]>{
    return this.http.get<Client[]>(environment.ebankApiUrl + "/customers");
  }
  public searchCustomers(keyword: string): Observable<Client[]>{
    return this.http.get<Client[]>(environment.ebankApiUrl + "/customers/search?keyword="+keyword);
  }
}
