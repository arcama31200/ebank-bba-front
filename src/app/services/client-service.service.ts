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
  public saveCustomer(customer:Client):Observable<Client>{
    return this.http.post<Client>(environment.ebankApiUrl + "/customers", customer);
  }
  public updateCustomer(id:number, customer: Client): Observable<Client>{
    return this.http.put<Client>(environment.ebankApiUrl + "/customers/" + id, customer);
  }
  public getCustomerById(id:number): Observable<Client>{
    return this.http.get<Client>(environment.ebankApiUrl + "/customers/" + id);
  }
  public deleteCustomer(id: number): Observable<void>{
    return this.http.delete<void>(environment.ebankApiUrl + "/customers/" + id);
  }
}
