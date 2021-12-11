import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import {createLocation} from '../../actions';
import { Location } from '../../models/location';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';
import { LocationState } from '../../reducers';

@Component({
  selector: 'app-registre-locations',
  templateUrl: './registre-locations.component.html',
  styleUrls: ['./registre-locations.component.css']
})
export class RegistreLocationsComponent implements OnInit {

  public location: Location;

  public location_description: FormControl;
  public regLocationForm: FormGroup;
  public bSubmitted: boolean;

  locationState$: LocationState;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('locationApp').subscribe(locations => this.locationState$ = locations);
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.location_description = new FormControl('', [Validators.required]);

    this.regLocationForm = this.formBuilder.group({
      location_description: this.location_description,
    });
  }

  public saveLocation(){

    const form = this.regLocationForm.value as Location;

    this.bSubmitted = true;

    this.store.dispatch(createLocation({ location: form  }))
   
    this.regLocationForm.reset();

    const alert = 'Nova ubicació creada';

    this.webSocketService.locationEvent({alert});

  }

}
