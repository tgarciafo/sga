import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { IntroduccioPaletsComponent } from './Components/intro_Pal/introduccio-palets/introduccio-palets.component';
import { IntroduccioPalets2Component } from './Components/intro_Pal/introduccio-palets2/introduccio-palets2.component';
import { ConsultaEntradesComponent } from './Components/consulta-entrades/consulta-entrades.component';
import { NgxPrintModule } from 'ngx-print';
import { SortidesComponent } from './Components/sortides/sortides.component';
import { ConsultaSortidesComponent } from './Components/consulta-sortides/consulta-sortides.component';
import { EstocClientComponent } from './Components/estocs/estoc-client/estoc-client.component';
import { EstocProducteComponent } from './Components/estocs/estoc-producte/estoc-producte.component';
import { EstocUbicacioComponent } from './Components/estocs/estoc-ubicacio/estoc-ubicacio.component';
import { EstocAlbaraComponent } from './Components/estocs/estoc-albara/estoc-albara.component';
import { EstocLotComponent } from './Components/estocs/estoc-lot/estoc-lot.component';
import { ConsultaSsccComponent } from './Components/estocs/consulta-sscc/consulta-sscc.component';
import { ConsultaSsccProducteComponent } from './Components/estocs/consulta-sscc-producte/consulta-sscc-producte.component';
import { AngularInputFocusModule } from 'angular-input-focus';

@NgModule({
  declarations: [
    IntroduccioPaletsComponent,
    IntroduccioPalets2Component,
    ConsultaEntradesComponent,
    SortidesComponent,
    ConsultaSortidesComponent,
    EstocClientComponent,
    EstocProducteComponent,
    EstocUbicacioComponent,
    EstocAlbaraComponent,
    EstocLotComponent,
    ConsultaSsccComponent,
    ConsultaSsccProducteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPrintModule,
    AngularInputFocusModule
  ]
})
export class PaletsModule { }