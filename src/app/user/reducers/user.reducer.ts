import { getLoginUser, getLoginUserSuccess, getLoginUserFailure, formatUserSuccess,
    createUser, createUserSuccess, createUserFailure, editUser, editUserError, editUserSuccess,
deleteUser, deleteUserError, deleteUserSuccess, getAllUsers, getAllUsersError, getAllUsersSuccess,
getUser, getUserError, getUserSuccess} from '../actions';
import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';

export interface UserState {
    users: any[];
    user: User | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: UserState = {
    users: [],
    user: null,
    loading: false,
    loaded: false,
    error: null
};

const _userReducer = createReducer(
initialState,
on(getLoginUser, (state) => ({
    ...state,
    loading: true,
})),
on(getLoginUserSuccess, (state,{user}) => ({
    ...state,
    user: user,
    error: null,
    loading: false,
    loaded: true})),
on(getLoginUserFailure, (state, { payload }) => ({
    ...state,
    error: {
        url: payload.url,
        status: payload.status,
        message: payload.message
    },
    loading: false,
    loaded: false
})),
on(createUser, (state) => ({
    ...state,
    loading: true,
})),
on(createUserSuccess, (state, {user}) => ({
    ...state,
    users: [...state.users, user],
    error: null,
    loading: false,
    loaded: true
})),
on(createUserFailure, (state, { payload }) => ({
    ...state,
    error: {
        url: payload.url,
        status: payload.status,
        message: payload.message
    },
    loading: false,
    loaded: true
})),
on(editUser,state => ({ ...state, loading: true })),
    on(editUserSuccess, (state, { id, user }) => ({
        ...state,
        loading: false,
        loaded: false,
        users: [...state.users.map((_user) => {
            if (_user.user_id === id) {
                return {
                    ...user
                };
            } else {
                return _user;
            }
        })],
        error: null
    })),
    on(editUserError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteUser,  state => ({ ...state, loading: true })),
    on(deleteUserSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...state.users.filter(user => user.user_id !== id)],
        error: null
    })),
    on(deleteUserError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getAllUsers, state => ({ ...state, loading: true })),
    on(getAllUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...users],
        error: null
    })),
    on(getAllUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getUser, state => ({ ...state, loading: true })),
    on(getUserSuccess, (state, { user } ) => ({
        ...state,
        loading: false,
        loaded: true,
        user: user,
        error: null
    })),
    on(getUserError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),

on(formatUserSuccess, () => initialState)
);

export function userReducer(state:any, action:any) {
return _userReducer(state, action);
}
