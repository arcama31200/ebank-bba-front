import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client-service.service';
import { Client } from '../../models/client';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewClientComponent } from '../new-client/new-client.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NewClientComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{
  clients$: Observable<Client[]> | undefined;
  errorMessage: string | undefined;
  searchFormGroup!: FormGroup;
  constructor(private clientService: ClientService, private fb: FormBuilder, private router:Router){}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.handleSearchCustomers();
  }
  handleSearchCustomers(): void{
    let kw = this.searchFormGroup?.value.keyword;
    this.clients$ = this.clientService.searchCustomers(kw).pipe(
      catchError(err=>{
        this.errorMessage = err.message;
        return throwError(()=> new Error(this.errorMessage));
      })
    )
  }
  handleEditCustomer(id: number){
    this.router.navigateByUrl("admin/editer/"+id);
  }
  goToNewCust(){
    this.router.navigateByUrl("admin/nouveau");
  }
  handleDeleteCustomer(id: number){
    this.clientService.deleteCustomer(id).subscribe({
      next: ()=> {

        alert("Le client " + id + "a bien été supprimé");
        this.router.navigateByUrl("admin/clients");
      },
      error: err =>{
        console.log(err.message)
        // TODO : Créer un composant qui affiche les erreurs (un toast)
      }
    })
  }
  handleCustomerAccounts(customer: Client) {
    this.router.navigateByUrl("admin/customer-accounts/"+customer.id,{state :customer});
  }
} 
