import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistreClientsComponent } from './Components/registre-clients/registre-clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClientsRegistratsComponent } from './Components/clients-registrats/clients-registrats.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    RegistreClientsComponent,
    ClientsRegistratsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPrintModule
  ]
})
export class ClientsModule { }