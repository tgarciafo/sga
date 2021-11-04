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

@NgModule({
  declarations: [
    IntroduccioPaletsComponent,
    IntroduccioPalets2Component,
    ConsultaEntradesComponent,
    SortidesComponent,
    ConsultaSortidesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPrintModule
  ]
})
export class PaletsModule { }