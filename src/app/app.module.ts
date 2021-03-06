import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { PlanificationModule } from './planification/planification.module';
import { BloquejatsModule } from './bloquejats/bloquejats.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPrintModule,
    LoginModule,
    UserModule,
    ClientsModule,
    ProductesModule,
    LocationsModule,
    PaletsModule,
    PlanificationModule,
    BloquejatsModule,
    FontAwesomeModule,
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
    EffectsModule.forRoot(EffectsApp),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    DatePipe, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
