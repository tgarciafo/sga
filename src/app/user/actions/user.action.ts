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

export const formatUser = createAction('[User]  Format User');
export const formatUserSuccess = createAction('[User] Format User Success');
