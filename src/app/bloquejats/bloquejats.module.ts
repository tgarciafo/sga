import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { BloquejarPaletsComponent } from './Components/bloquejar-palets/bloquejar-palets.component';
import { ConsultaBloquejatsComponent } from './Components/consulta-bloquejats/consulta-bloquejats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    BloquejarPaletsComponent,
    ConsultaBloquejatsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPrintModule,
    FontAwesomeModule
  ]
})
export class BloquejatsModule { }