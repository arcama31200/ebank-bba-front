import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css'
})
export class NewClientComponent implements OnInit{
  newCustomerFormGroup! : FormGroup;
  constructor(private fb: FormBuilder, private clientService: ClientService, private router:Router){}

  ngOnInit(): void {
      this.newCustomerFormGroup = this.fb.group({
        nom : this.fb.control("", [Validators.required]),
        prenom : this.fb.control("", [Validators.required]),
        email: this.fb.control("", [Validators.required, Validators.email])
      })
  }
  handleNewCustomer(){
    this.clientService.saveCustomer(this.newCustomerFormGroup.value).subscribe(
      {
        next: data=>{
          alert("Le client " + data.nom + " a bien été ajouté ! ");
          this.router.navigateByUrl("admin/clients")
        },
        error: err =>{
          console.log(err.message);
        }
      }
    )
  } 

}
