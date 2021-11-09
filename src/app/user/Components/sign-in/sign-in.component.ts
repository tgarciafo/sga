import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { createUser } from '../../actions';
import { User } from '../../models/user';
import { ClientState } from '../../../clients/reducers';
import { getAllClients } from 'src/app/clients/actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user: User;

  clientState$: ClientState;


  public name: FormControl;
  public password: FormControl;
  public email: FormControl;
  public type: FormControl;
  public user_name: FormControl;
  public client_id: FormControl;
  public repeat_password: FormControl;
  public errorUser: any;
  public regUserForm: FormGroup;
  public bSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients())

    this.bSubmitted = false;
    this.name = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.type = new FormControl('', [Validators.required]);
    this.user_name = new FormControl('', [Validators.required]);
    this.client_id = new FormControl('', [Validators.required]);
    this.errorUser = '';

    this.regUserForm = this.formBuilder.group({
      name: this.name,
      password: this.password,
      email: this.email,
      type: this.type,
      user_name: this.user_name
    });
  }

  public saveUser(){
    
    const form = this.regUserForm.value as User;

    this.bSubmitted = true;

    this.store.dispatch(createUser({ user:form }));

    return this.regUserForm.reset();

  }

}
