import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetails } from '../models/account.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    console.log("Valeur de accountId : ", accountId);
    if(accountId === ""){
      return this.http.get<AccountDetails>(environment.ebankApiUrl+"/accounts")
    }else{
      return this.http.get<AccountDetails>(environment.ebankApiUrl+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
    }
  }
  searchAccounts(keyword: string): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${environment.ebankApiUrl}/accounts/search?keyword=${keyword}`);
  }
  createAccount(accountData: any): Observable<any> {
    return this.http.post(`${environment.ebankApiUrl}/accounts/add`, accountData);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.ebankApiUrl+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.ebankApiUrl+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.ebankApiUrl+"/accounts/transfer",data);
  }
}
