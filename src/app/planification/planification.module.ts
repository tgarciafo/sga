import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { PlanificacioComponent } from './Components/planificacio/planificacio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConsultaPlanificatsComponent } from './Components/consulta-planificats/consulta-planificats.component';

@NgModule({
  declarations: [
    PlanificacioComponent,
    ConsultaPlanificatsComponent
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
export class PlanificationModule { }