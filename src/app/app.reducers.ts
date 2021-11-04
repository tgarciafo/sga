import { ActionReducerMap } from '@ngrx/store';
import * as reducersLogin from './login/reducers';
import * as reducersUser from './user/reducers';
import * as reducersClient from './clients/reducers';
import * as reducersProducte from './productes/reducers';
import * as reducersLocation from './locations/reducers';
import * as reducersPalet from './palets/reducers';
import * as reducersPlanification from './planification/reducers';
import * as reducersBlock from './block/reducers';
import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
    loginApp: reducersLogin.LoginState;
    userApp: reducersUser.UserState;
    clientApp: reducersClient.ClientState;
    producteApp: reducersProducte.ProducteState;
    locationApp: reducersLocation.LocationState;
    paletApp: reducersPalet.PaletState;
    planificationApp: reducersPlanification.PlanificationState;
    blockApp: reducersBlock.BlockState;
    router: fromRouter.RouterReducerState<any>;
}

export const appReducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    loginApp: reducersLogin.loginReducer,
    userApp: reducersUser.userReducer,
    clientApp: reducersClient.clientReducer,
    producteApp: reducersProducte.producteReducer,
    locationApp: reducersLocation.locationReducer,
    paletApp: reducersPalet.paletReducer,
    planificationApp: reducersPlanification.planificationReducer,
    blockApp: reducersBlock.blockReducer
};


