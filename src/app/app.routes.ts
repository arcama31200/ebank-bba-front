import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ComptesComponent } from './components/comptes/comptes.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: HomeComponent, canActivate: [authGuard]},
    {path: "home", component: HomeComponent, canActivate: [authGuard]},
    {path:"clients", component: ClientsComponent, canActivate: [authGuard]},
    {path:"comptes", component: ComptesComponent, canActivate: [authGuard]},
    {path:"nouveau", component: NewClientComponent, canActivate: [authGuard]},
    {path:"editer/:id", component: EditClientComponent, canActivate: [authGuard]},
    {path: '**', component: NotFoundComponent}, //Rediriger toutes les autres routes vers /home
];
