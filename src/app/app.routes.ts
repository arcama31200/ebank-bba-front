import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ComptesComponent } from './components/comptes/comptes.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { authenticationGuard } from './guards/authentication.guard';
import { authorizationGuard } from './guards/authorization.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {path: "admin", component: AdminTemplateComponent, canActivate: [authenticationGuard], children : [
        {path: "home", component: HomeComponent},
        {path:"clients", component: ClientsComponent},
        {path:"comptes", component: ComptesComponent},
        {path:"nouveau", component: NewClientComponent, canActivate: [authorizationGuard], data: {role:"ADMIN"} },
        {path:"editer/:id", component: EditClientComponent, canActivate: [authorizationGuard], data: {role:"ADMIN"}},
        {path: 'NotAuthorized', component: NotAuthorizedComponent}
    ]},
    {path: '**', component: NotFoundComponent}, //Rediriger toutes les autres routes vers /home
];
