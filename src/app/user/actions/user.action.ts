import {createAction, props} from '@ngrx/store';
import { User } from '../models/user';
import { Credentials } from '../../login/models/credentials';

export const getLoginUser = createAction(
    '[User] Get Login User',
    props<{ credentials: Credentials }>()
  );

export const getLoginUserSuccess = createAction(
    '[User] Get Login User Success',
    props<{ user: User }>()
);

export const getLoginUserFailure = createAction(
    '[User] Get Login User Failure',
    props<{ payload: any }>()
);

export const createUser = createAction('[User] Create User',
    props<{ user: User }>()
);
export const createUserSuccess = createAction('[User] Create User Success',
    props<{ user: User }>()
);

export const createUserFailure = createAction('[User] Create User Failure',
    props<{ payload: any }>()
);

export const editUser = createAction(
    '[User] Edit User',
    props<{ id: number, user: User }>()
);

export const editUserSuccess = createAction(
    '[User] Edit User Success',
    props<{ id: number, user: User }>()
);

export const editUserError = createAction(
    '[User] Edit User Error',
    props<{ payload: any }>()
);

export const deleteUser = createAction(
    '[User] Delete User',
    props<{ id:number }>()
);

export const deleteUserSuccess = createAction(
    '[User] Delete User Success',
    props<{ id:number }>()
);

export const deleteUserError = createAction(
    '[User] Delete User Error',
    props<{ payload:any }>()
);

export const getAllUsers = createAction('[User] Get all');

export const getAllUsersSuccess = createAction(
    '[User] Get all success',
    props<{ users: any[] }>()
);

export const getAllUsersError = createAction(
    '[User] Get all error',
    props<{payload: any}>()
);

export const getUser = createAction(
    '[User] Get User',
props<{ user: User }>());

export const getUserSuccess = createAction(
    '[User] Get User success',
    props<{ user: User }>()
);

export const getUserError = createAction(
    '[User] Get User error',
    props<{payload: any}>()
);

export const formatUser = createAction('[User]  Format User');
export const formatUserSuccess = createAction('[User] Format User Success');
