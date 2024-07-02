import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client-service.service';
import { Client } from '../../models/client';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{
  clients$: Observable<Client[]> | undefined;
  errorMessage: string | undefined;
  searchFormGroup!: FormGroup;
  constructor(private clientService: ClientService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.clients$ = this.clientService.getCustomers().pipe(
      catchError(err=> {
        this.errorMessage = err.message;
        return throwError(() => new Error(this.errorMessage));
      })
    );
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
  
} 
