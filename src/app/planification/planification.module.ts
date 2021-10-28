import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { PlanificacioComponent } from './Components/planificacio/planificacio.component';

@NgModule({
  declarations: [
    PlanificacioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPrintModule
  ]
})
export class PlanificationModule { }