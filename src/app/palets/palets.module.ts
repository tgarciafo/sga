import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { IntroduccioPaletsComponent } from './Components/intro_Pal/introduccio-palets/introduccio-palets.component';
import { IntroduccioPalets2Component } from './Components/intro_Pal/introduccio-palets2/introduccio-palets2.component';
import { ConsultaEntradesComponent } from './Components/consulta-entrades/consulta-entrades.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    IntroduccioPaletsComponent,
    IntroduccioPalets2Component,
    ConsultaEntradesComponent
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