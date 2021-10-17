import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistreClientsComponent } from './clients/Components/registre-clients/registre-clients.component';
import { LoginComponent } from './login/Components/login/login.component';
import { UserComponent } from './user/Components/user/user.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path:'user', component: UserComponent},
  { path: 'registre-clients', component: RegistreClientsComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
