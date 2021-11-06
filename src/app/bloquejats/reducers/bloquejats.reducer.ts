import { createReducer, on } from '@ngrx/store';
import { Bloquejat } from '../models/bloquejat';
import {
    createBloquejat, getBloquejat, getBloquejatError, getBloquejatSuccess, 
    deleteBloquejat, deleteBloquejatSuccess, deleteBloquejatError, getAllBloquejats, getAllBloquejatsSuccess,
    getAllBloquejatsError, createBloquejatSuccess, createBloquejatError,
    consultaPalBloquejats,consultaPalBloquejatsError,consultaPalBloquejatsSuccess
} from '../actions/bloquejats.action';

export interface BloquejatState{
    bloquejats: Bloquejat[];
    bloquejat: Bloquejat | null;
    consultaPalB: any[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: BloquejatState = {
    bloquejats: [],
    bloquejat: null,
    consultaPalB: [],
    loading: false,
    loaded: false,
    error: null
};

const _bloquejatReducer = createReducer(
    initialState,
    on(createBloquejat, state => ({ ...state, loading: true })),
    on(createBloquejatSuccess, (state, { bloquejat }) => ({
        ...state,
        loading: false,
        loaded: true,
        bloquejats: [...state.bloquejats, bloquejat]
    })),
    on(createBloquejatError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteBloquejat,  state => ({ ...state, loading: true })),
    on(deleteBloquejatSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: true,
        bloquejats: [...state.bloquejats.filter(bloquejat => bloquejat.bloquejat_id !== id)]
    })),
    on(deleteBloquejatError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getAllBloquejats, state => ({ ...state, loading: true })),
    on(getAllBloquejatsSuccess, (state, { bloquejats }) => ({
        ...state,
        loading: false,
        loaded: true,
        bloquejats: [...bloquejats]
    })),
    on(getAllBloquejatsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getBloquejat, state => ({ ...state, loading: true })),
    on(getBloquejatSuccess, (state, { bloquejat } ) => ({
        ...state,
        loading: false,
        loaded: true,
        bloquejat: bloquejat,
    })),
    on(getBloquejatError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(consultaPalBloquejats, state => ({ ...state, loading: true })),
    on(consultaPalBloquejatsSuccess, (state, { consultaPalB }) => ({
        ...state,
        loading: false,
        loaded: true,
        consultaPalB: consultaPalB
    })),
    on(consultaPalBloquejatsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    }))
)

export function bloquejatReducer(state: any, action: any) {
    return _bloquejatReducer(state, action);
}