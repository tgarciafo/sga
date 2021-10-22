import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './Views/header/header.component';
import { EffectsModule } from '@ngrx/effects';

import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducers';
import { EffectsApp } from './app.effects';
import { environment } from 'src/environments/environment';
import { UserModule } from './user/user.module';
import { ClientsModule } from './clients/clients.module';
import { HomeComponent } from './Views/home/home.component';
import { LocationsModule } from './locations/locations.module';
import { ProductesModule } from './productes/productes.module';
import { PaletsModule } from './palets/palets.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    UserModule,
    ClientsModule,
    ProductesModule,
    LocationsModule,
    PaletsModule,
    StoreModule.forRoot( appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    EffectsModule.forRoot(EffectsApp)
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
