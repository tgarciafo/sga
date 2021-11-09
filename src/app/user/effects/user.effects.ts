import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import * as UserActions from '../actions';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import * as LoginActions from '../../login/actions';

@Injectable()
export class UserEffects {

  GetLoginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getLoginUser, LoginActions.loginSuccess),
      exhaustMap(({credentials}) =>
        this.userService.login(credentials).pipe(
        map((user) =>
          UserActions.getLoginUserSuccess({ user })
        ),
        catchError((error) => of(UserActions.getLoginUserFailure({ payload: error })))
        )
      )
    )
  ); 

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(({user}) =>
        this.userService.addUser(user).pipe(
          map((newUser) =>
            UserActions.createUserSuccess( {user: newUser} )
          ),
          catchError((error) => of(UserActions.createUserFailure({ payload: error })))
        )
      )
    )
  );

  formatUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.formatUser, LoginActions.logoutConfirmation),
      map(() => UserActions.formatUserSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
) {}

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }
}
