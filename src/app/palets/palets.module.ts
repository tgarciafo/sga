import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { IntroduccioPaletsComponent } from './Components/intro_Pal/introduccio-palets/introduccio-palets.component';
import { IntroduccioPalets2Component } from './Components/intro_Pal/introduccio-palets2/introduccio-palets2.component';

@NgModule({
  declarations: [
    IntroduccioPaletsComponent,
    IntroduccioPalets2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class PaletsModule { }