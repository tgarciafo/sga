import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../actions';
import { ClientState } from '../../reducers';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';

@Component({
  selector: 'app-clients-registrats',
  templateUrl: './clients-registrats.component.html',
  styleUrls: ['./clients-registrats.component.css']
})
export class ClientsRegistratsComponent implements OnInit {

  clientState$: ClientState;

  public emit= true;

  alertMsg: string;
      
  isAlert: boolean = false;

  constructor(private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.webSocketService.outEven.subscribe(res => {
      this.store.dispatch(getAllClients());
      this.isAlert = true;
      this.alertMsg = 'Nou client creat';
      this.emit=false;
    })
  }

  close(){
    this.isAlert = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
  }

}
