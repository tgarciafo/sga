import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsRegistratsComponent } from './clients/Components/clients-registrats/clients-registrats.component';
import { RegistreClientsComponent } from './clients/Components/registre-clients/registre-clients.component';
import { LocationsRegistradesComponent } from './locations/Components/locations-registrades/locations-registrades.component';
import { RegistreLocationsComponent } from './locations/Components/registre-locations/registre-locations.component';
import { LoginComponent } from './login/Components/login/login.component';
import { IntroduccioPaletsComponent } from './palets/Components/intro_Pal/introduccio-palets/introduccio-palets.component';
import { IntroduccioPalets2Component } from './palets/Components/intro_Pal/introduccio-palets2/introduccio-palets2.component';
import { ProductesRegistratsComponent } from './productes/Components/productes-registrats/productes-registrats.component';
import { RegistreProductesComponent } from './productes/Components/registre-productes/registre-productes.component';
import { SignInComponent } from './user/Components/sign-in/sign-in.component';
import { UserComponent } from './user/Components/user/user.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path:'user', component: UserComponent},
  { path:'sign-in', component: SignInComponent},
  { path: 'registre-clients', component: RegistreClientsComponent},
  { path: 'clients-registrats', component: ClientsRegistratsComponent},
  { path: 'registre-productes', component: RegistreProductesComponent},
  { path: 'productes-registrats', component: ProductesRegistratsComponent},
  { path: 'registre-locations', component: RegistreLocationsComponent},
  { path: 'locations-registrades', component: LocationsRegistradesComponent},
  { path: 'entrada', component: IntroduccioPaletsComponent},
  { path: 'lectura-palets', component: IntroduccioPalets2Component},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
