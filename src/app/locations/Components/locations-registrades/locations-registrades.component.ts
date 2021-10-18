import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllLocations } from '../../actions';
import { LocationState } from '../../reducers';

@Component({
  selector: 'app-locations-registrades',
  templateUrl: './locations-registrades.component.html',
  styleUrls: ['./locations-registrades.component.css']
})
export class LocationsRegistradesComponent implements OnInit {

  locationState$: LocationState;

  constructor(private store: Store<AppState>) { 
    this.store.select('locationApp').subscribe(locations => this.locationState$ = locations);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllLocations());
  }

}
