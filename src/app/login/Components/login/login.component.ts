import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { LoginState } from '../../reducers';
import * as LoginAction from '../../actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: FormControl;
  public password: FormControl;
  public loginForm: FormGroup;
  public bSubmitted: boolean;

  loginState$: LoginState;


  constructor( private store: Store<AppState>,private formBuilder: FormBuilder) 
  { 
    this.store.select('loginApp').subscribe(login => this.loginState$ = login);

  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  public checkLogin(){

    this.bSubmitted = true;
    const credentials = {
      email: this.email.value,
      password: this.password.value,
    };
        this.store.dispatch(LoginAction.login({credentials}));

  }

}
