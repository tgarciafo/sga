import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import {createLocation} from '../../actions';
import { Location } from '../../models/location';

@Component({
  selector: 'app-registre-locations',
  templateUrl: './registre-locations.component.html',
  styleUrls: ['./registre-locations.component.css']
})
export class RegistreLocationsComponent implements OnInit {

  public location: Location;

  public location_description: FormControl;
  public regLocationForm: FormGroup;
  public errorLocation: any;
  public bSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.location_description = new FormControl('', [Validators.required]);
    this.errorLocation = '';

    this.regLocationForm = this.formBuilder.group({
      location_description: this.location_description,
    });
  }

  public saveLocation(){

    const form = this.regLocationForm.value as Location;

    this.bSubmitted = true;

    this.store.dispatch(createLocation({ location: form  }))
   
    return this.regLocationForm.reset();

  }

}
