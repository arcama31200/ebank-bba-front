import { Component } from '@angular/core';
import { Client } from '../../models/client';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent {
  customerId! : string ;
  customer! : Client;
  constructor(private route : ActivatedRoute, private router :Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Client;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

  }
}
