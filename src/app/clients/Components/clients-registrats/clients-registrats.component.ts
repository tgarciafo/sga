import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../actions';
import { ClientState } from '../../reducers';

@Component({
  selector: 'app-clients-registrats',
  templateUrl: './clients-registrats.component.html',
  styleUrls: ['./clients-registrats.component.css']
})
export class ClientsRegistratsComponent implements OnInit {

  clientState$: ClientState;

  constructor(private store: Store<AppState>) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
  }

}
