import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegistreProductesComponent } from './Components/registre-productes/registre-productes.component';
import { ProductesRegistratsComponent } from './Components/productes-registrats/productes-registrats.component';
import { NgxPrintModule } from 'ngx-print';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    RegistreProductesComponent,
    ProductesRegistratsComponent
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
export class ProductesModule { }