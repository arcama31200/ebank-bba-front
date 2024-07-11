import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit{
  editCustomerFormGroup! : FormGroup;
  clientId!: number;
  constructor(private fb: FormBuilder, private clientService: ClientService, private router:Router, private route:ActivatedRoute){
    this.editCustomerFormGroup = this.fb.group({
      nom : this.fb.control("", [Validators.required]),
      prenom : this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
      this.clientId = this.route.snapshot.params['id'];
      console.log("valeur de clientId : ", this.clientId);
      this.clientService.getCustomerById(this.clientId).subscribe(
        {
          next: customer=>{
            this.editCustomerFormGroup.patchValue({
              nom: customer.nom,
              prenom: customer.prenom,
              email: customer.email
            })
          },
          error: err =>{
            console.log(err.message)
            // TODO : Créer un composant qui affiche les erreurs (un toast)
          }
        }
      )
      
  }
  handleUpdateCustomer(){
    this.clientService.updateCustomer(this.clientId, this.editCustomerFormGroup.value).subscribe(
      {
        next: data=>{
          alert("Le client " + data.nom + " a bien été modifié ! ");
          this.router.navigateByUrl("admin/clients")
        },
        error: err =>{
          console.log(err.message);
        }
      }
    )
  } 
}
