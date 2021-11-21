import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllLocations } from '../../actions';
import { LocationState } from '../../reducers';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';

@Component({
  selector: 'app-locations-registrades',
  templateUrl: './locations-registrades.component.html',
  styleUrls: ['./locations-registrades.component.css']
})
export class LocationsRegistradesComponent implements OnInit {

  locationState$: LocationState;

  alertMsg: string;
      
  isAlert: boolean = false;

  constructor(private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('locationApp').subscribe(locations => this.locationState$ = locations);
    this.webSocketService.bloquejarEven.subscribe(res => {
      this.store.dispatch(getAllLocations());
      this.isAlert = true;
      this.alertMsg = res.alert;
    })
  }

  close(){
    this.isAlert = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllLocations());
  }

}
