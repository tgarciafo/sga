import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloquejarPaletsComponent } from './bloquejats/Components/bloquejar-palets/bloquejar-palets.component';
import { ConsultaBloquejatsComponent } from './bloquejats/Components/consulta-bloquejats/consulta-bloquejats.component';
import { ClientsRegistratsComponent } from './clients/Components/clients-registrats/clients-registrats.component';
import { RegistreClientsComponent } from './clients/Components/registre-clients/registre-clients.component';
import { LocationsRegistradesComponent } from './locations/Components/locations-registrades/locations-registrades.component';
import { RegistreLocationsComponent } from './locations/Components/registre-locations/registre-locations.component';
import { LoginComponent } from './login/Components/login/login.component';
import { ConsultaEntradesComponent } from './palets/Components/consulta-entrades/consulta-entrades.component';
import { ConsultaSortidesComponent } from './palets/Components/consulta-sortides/consulta-sortides.component';
import { ConsultaSsccProducteComponent } from './palets/Components/estocs/consulta-sscc-producte/consulta-sscc-producte.component';
import { ConsultaSsccComponent } from './palets/Components/estocs/consulta-sscc/consulta-sscc.component';
import { EstocAlbaraComponent } from './palets/Components/estocs/estoc-albara/estoc-albara.component';
import { EstocClientComponent } from './palets/Components/estocs/estoc-client/estoc-client.component';
import { EstocLotComponent } from './palets/Components/estocs/estoc-lot/estoc-lot.component';
import { EstocProducteComponent } from './palets/Components/estocs/estoc-producte/estoc-producte.component';
import { EstocUbicacioComponent } from './palets/Components/estocs/estoc-ubicacio/estoc-ubicacio.component';
import { IntroduccioPaletsComponent } from './palets/Components/intro_Pal/introduccio-palets/introduccio-palets.component';
import { IntroduccioPalets2Component } from './palets/Components/intro_Pal/introduccio-palets2/introduccio-palets2.component';
import { SortidesComponent } from './palets/Components/sortides/sortides.component';
import { ConsultaPlanificatsComponent } from './planification/Components/consulta-planificats/consulta-planificats.component';
import { PlanificacioComponent } from './planification/Components/planificacio/planificacio.component';
import { ProductesRegistratsComponent } from './productes/Components/productes-registrats/productes-registrats.component';
import { RegistreProductesComponent } from './productes/Components/registre-productes/registre-productes.component';
import { AuthGuard } from './Shared/guards/auth.guard';
import { SignInComponent } from './user/Components/sign-in/sign-in.component';
import { UserComponent } from './user/Components/user/user.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'sign-in', component: SignInComponent, canActivate: [AuthGuard]},
  { path: 'registre-clients', component: RegistreClientsComponent, canActivate: [AuthGuard]},
  { path: 'clients-registrats', component: ClientsRegistratsComponent, canActivate: [AuthGuard]},
  { path: 'registre-productes', component: RegistreProductesComponent, canActivate: [AuthGuard]},
  { path: 'productes-registrats', component: ProductesRegistratsComponent, canActivate: [AuthGuard]},
  { path: 'registre-locations', component: RegistreLocationsComponent, canActivate: [AuthGuard]},
  { path: 'locations-registrades', component: LocationsRegistradesComponent, canActivate: [AuthGuard]},
  { path: 'entrada', component: IntroduccioPaletsComponent, canActivate: [AuthGuard]},
  { path: 'lectura-palets', component: IntroduccioPalets2Component, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'consulta-entrades', component: ConsultaEntradesComponent, canActivate: [AuthGuard]},
  { path: 'planificacio-sortides', component: PlanificacioComponent, canActivate: [AuthGuard]},
  { path: 'picking', component: SortidesComponent, canActivate: [AuthGuard]},
  { path: 'consulta-sortides', component: ConsultaSortidesComponent, canActivate: [AuthGuard]},
  { path: 'bloquejar-palets', component: BloquejarPaletsComponent, canActivate: [AuthGuard]},
  { path: 'consulta-bloquejats', component: ConsultaBloquejatsComponent, canActivate: [AuthGuard]},
  { path: 'consulta-planificats', component: ConsultaPlanificatsComponent, canActivate: [AuthGuard]},
  { path: 'estoc-client', component: EstocClientComponent, canActivate: [AuthGuard]},
  { path: 'estoc-producte', component: EstocProducteComponent, canActivate: [AuthGuard]},
  { path: 'estoc-ubicacio', component: EstocUbicacioComponent, canActivate: [AuthGuard]},
  { path: 'estoc-albara', component: EstocAlbaraComponent, canActivate: [AuthGuard]},
  { path: 'estoc-lot', component: EstocLotComponent, canActivate: [AuthGuard]},
  { path: 'consulta-sscc', component: ConsultaSsccComponent, canActivate: [AuthGuard]},
  { path: 'consulta-sscc-producte', component: ConsultaSsccProducteComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
