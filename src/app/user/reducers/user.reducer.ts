import { getLoginUser, getLoginUserSuccess, getLoginUserFailure, formatUserSuccess,
    createUser, createUserSuccess, createUserFailure} from '../actions';
import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';

export interface UserState {
user: User | null;
error: any | null;
pending: boolean;
}

export const initialState: UserState = {
user: null,
error: null,
pending: false
};

const _userReducer = createReducer(
initialState,
on(getLoginUser, (state) => ({
    ...state,
    error: null,
    pending: true,
})),
on(getLoginUserSuccess, (state,{user}) => ({
    ...state,
    user: user,
    error: null,
    pending: false})),
on(getLoginUserFailure, (state, { payload }) => ({
    ...state,
    error: {
        url: payload.url,
        status: payload.status,
        message: payload.message
    },
    pending: false,
})),
on(createUser, (state) => ({
    ...state,
    error: null,
    pending: true,
})),
on(createUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    error: false,
    pending: false
})),
on(createUserFailure, (state, { payload }) => ({
    ...state,
    error: {
        url: payload.url,
        status: payload.status,
        message: payload.message
    },
    pending: false,
})),

on(formatUserSuccess, () => initialState)
);

export function userReducer(state:any, action:any) {
return _userReducer(state, action);
}
