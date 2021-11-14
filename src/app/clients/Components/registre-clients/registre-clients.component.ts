import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { User } from '../../../user/models/user';
import {createClient} from '../../actions';
import { Client } from '../../models/client';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';

@Component({
  selector: 'app-registre-clients',
  templateUrl: './registre-clients.component.html',
  styleUrls: ['./registre-clients.component.css']
})
export class RegistreClientsComponent implements OnInit {

  public user: User | null;

  public client: Client;

  public emit= true;

  public client_code: FormControl;
  public description_client: FormControl;
  public regClientForm: FormGroup;
  public errorClient: any;
  public bSubmitted: boolean;

  isAlert = false;

  constructor(private formBuilder: FormBuilder,  private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('userApp').subscribe(userResponse => this.user = userResponse.user);
    this.webSocketService.outEven.subscribe(res => {
      this.isAlert = true;
      this.emit=false;
    })
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.client_code = new FormControl('', [Validators.required]);
    this.description_client = new FormControl('', [Validators.required]);
    this.errorClient = '';

    this.regClientForm = this.formBuilder.group({
      client_code: this.client_code,
      description_client: this.description_client,
    });
  }

  public saveClient(){

    this.emit = true;

    const form = this.regClientForm.value as Client;

    this.bSubmitted = true;

    this.store.dispatch(createClient({ client: form  }));
   
    this.regClientForm.reset();

    const alert = 'Nou client creat';

    if(this.emit){
    this.webSocketService.emitEvent({alert});
    }
  }

}
