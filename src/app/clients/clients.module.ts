import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistreClientsComponent } from './Components/registre-clients/registre-clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegistreClientsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class ClientsModule { }