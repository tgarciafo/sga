import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { LoginState } from '../../login/reducers';
import * as LoginAction from '../../login/actions';
import { UserState } from '../../user/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginState$: LoginState;
  userState$: UserState;

  constructor( public router: Router,
               private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.select('loginApp').subscribe(login => this.loginState$ = login);
    this.store.select('userApp').subscribe(user => this.userState$ = user);
  }

  // Se inicializa el componente
  init(): void {}

  // Se recoge la pulsación sobre el botón de logout
  onClickLogout(): void {
    // Se desloga al usuario
    this.store.dispatch(LoginAction.logout());
  }

}
