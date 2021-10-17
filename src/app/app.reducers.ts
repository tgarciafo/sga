import { ActionReducerMap } from '@ngrx/store';
import * as reducersLogin from './login/reducers';
import * as reducersUser from './user/reducers';
import * as reducersClient from './clients/reducers';
import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
    loginApp: reducersLogin.LoginState;
    userApp: reducersUser.UserState;
    clientApp: reducersClient.ClientState;
    router: fromRouter.RouterReducerState<any>;
}

export const appReducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    loginApp: reducersLogin.loginReducer,
    userApp: reducersUser.userReducer,
    clientApp: reducersClient.clientReducer
};


