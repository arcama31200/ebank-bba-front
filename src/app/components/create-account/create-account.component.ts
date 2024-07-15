// create-account.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { ClientService } from '../../services/client-service.service';
import { Client } from '../../models/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{
  accountFormGroup: FormGroup;
  clients: Client[] = [];

  constructor(private fb: FormBuilder, private accountService: AccountsService, private router: Router, private clientService: ClientService) {
    this.accountFormGroup = this.fb.group({
      type: [''],
      identifiantBancaire: [''],
      description: [''],
      solde: [0],
      clientId: []
    });
  }
  ngOnInit(): void {
      this.loadClients();
  }
  handleCreateAccount() {
    const accountData = this.accountFormGroup.value;
    this.accountService.createAccount(accountData).subscribe({
      next: () => {
        alert('Account created successfully');
        this.router.navigate(['/comptes']);
      },
      error: err => {
        console.error(err);
      }
    });
  }
  loadClients() {
    this.clientService.getCustomers().subscribe({
      next: (clients: Client[]) => {
        this.clients = clients;
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
