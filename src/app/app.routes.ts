import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ComptesComponent } from './components/comptes/comptes.component';

export const routes: Routes = [
    {path:"clients", component: ClientsComponent},
    {path:"comptes", component: ComptesComponent}
];
