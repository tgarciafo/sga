import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './Components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';

@NgModule({
  declarations: [
    UserComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class UserModule { }
