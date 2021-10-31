import { createReducer, on } from '@ngrx/store';
import { Palet } from '../models/palet';
import {
    createPalet, createPaletSuccess, createPaletError, contador, contadorSuccess, contadorError, 
    consultaEntrades, consultaEntradesError, consultaEntradesSuccess, consultaPalEntrades, 
    consultaPalEntradesError, consultaPalEntradesSuccess, consultaPalResta, consultaPalRestaError,consultaPalRestaSuccess
} from '../actions/palets.action';

export interface PaletState{
    palets: Palet[];
    palet: Palet | null;
    contador: number | null | unknown;
    palResta: number | null;
    consulta: any[];
    consultaPal: any[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: PaletState = {
    palets: [],
    palet: null,
    contador: null,
    palResta: null,
    consulta: [],
    consultaPal: [],
    loading: false,
    loaded: false,
    error: null
};

const _paletReducer = createReducer(
    initialState,
    on(createPalet, state => ({ ...state, loading: true })),
    on(createPaletSuccess, (state, { palet }) => ({
        ...state,
        loading: false,
        loaded: true,
        palets: [...state.palets, palet]
    })),
    on(createPaletError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(contador, state => ({ ...state, loading: true })),
    on(contadorSuccess, (state, { num_pal }) => ({
        ...state,
        loading: false,
        loaded: true,
        contador: num_pal
    })),
    on(contadorError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(consultaEntrades, state => ({ ...state, loading: true })),
    on(consultaEntradesSuccess, (state, { consulta }) => ({
        ...state,
        loading: false,
        loaded: true,
        consulta: consulta
    })),
    on(consultaEntradesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(consultaPalEntrades, state => ({ ...state, loading: true })),
    on(consultaPalEntradesSuccess, (state, { consultaPal }) => ({
        ...state,
        loading: false,
        loaded: true,
        consultaPal: consultaPal
    })),
    on(consultaPalEntradesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(consultaPalResta, state => ({ ...state, loading: true })),
    on(consultaPalRestaSuccess, (state, { palResta }) => ({
        ...state,
        loading: false,
        loaded: true,
        palResta: palResta
    })),
    on(consultaPalRestaError, (state, { payload }) => ({
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

export function paletReducer(state: any, action: any) {
    return _paletReducer(state, action);
}