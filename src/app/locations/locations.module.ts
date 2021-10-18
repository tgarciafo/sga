import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegistreLocationsComponent } from './Components/registre-locations/registre-locations.component';
import { LocationsRegistradesComponent } from './Components/locations-registrades/locations-registrades.component';

@NgModule({
  declarations: [
    RegistreLocationsComponent,
    LocationsRegistradesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class LocationsModule { }