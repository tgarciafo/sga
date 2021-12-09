import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
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

  getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getAllUsers, UserActions.deleteUserSuccess, UserActions.editUserSuccess),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map((users) => UserActions.getAllUsersSuccess({ users })),
                    catchError((err) => of(UserActions.getAllUsersError({ payload: err })))
                ))
        ));

  deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap(({id}) =>
                this.userService.deleteUser(id).pipe(
                    map(() => UserActions.deleteUserSuccess({ id } )),
                    catchError((err) => of(UserActions.deleteUserError({payload: err})))
                ))
        )
    );

    editUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.editUser),
            mergeMap(({id, user}) =>
                this.userService.updateUser(id, user).pipe(
                    map(() => UserActions.editUserSuccess({ id, user } )),
                    catchError((err) => of(UserActions.editUserError({payload: err})))
                ))
        )
    );

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getUser),
            mergeMap((action) =>
                this.userService.getUser(action.user.user_id).pipe(
                    map((user) => UserActions.getUserSuccess({ user })),
                    catchError((err) => of(UserActions.getUserError({ payload: err })))
                ))
        ));

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
