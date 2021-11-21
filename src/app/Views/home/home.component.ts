import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { UserState } from '../../user/reducers';
import { WebSocketService } from '../webSocket/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  page: string | null;

  userState$: UserState;

  constructor( private store: Store<AppState>) { 
    this.store.select('userApp').subscribe(user => this.userState$ = user);

  }

  ngOnInit() {
  }
  /* ngOnDestroy() {
    this.webSocketService.disconnect();
  } */

}
