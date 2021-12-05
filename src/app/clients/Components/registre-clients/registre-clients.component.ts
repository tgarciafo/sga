import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import {createClient} from '../../actions';
import { Client } from '../../models/client';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';
import { ClientState } from '../../reducers';

@Component({
  selector: 'app-registre-clients',
  templateUrl: './registre-clients.component.html',
  styleUrls: ['./registre-clients.component.css']
})
export class RegistreClientsComponent implements OnInit {

  public client: Client;

  public client_code: FormControl;
  public description_client: FormControl;
  public regClientForm: FormGroup;
  public bSubmitted: boolean;

  clientState$: ClientState;

  constructor(private formBuilder: FormBuilder,  private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.client_code = new FormControl('', [Validators.required]);
    this.description_client = new FormControl('', [Validators.required]);

    this.regClientForm = this.formBuilder.group({
      client_code: this.client_code,
      description_client: this.description_client,
    });
  }

  public saveClient(){

    const form = this.regClientForm.value as Client;

    this.bSubmitted = true;

    this.store.dispatch(createClient({ client: form  }));
   
    this.regClientForm.reset();

    const alert = 'Nou client creat';

    this.webSocketService.clientEvent({alert});
  }

}
