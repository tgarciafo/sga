import { createReducer, on } from '@ngrx/store';
import { Palet } from '../models/palet';
import {
    createPalet, createPaletSuccess, createPaletError, contador, contadorSuccess, contadorError
} from '../actions/palets.action';

export interface PaletState{
    palets: Palet[];
    palet: Palet | null;
    contador: number | null | unknown;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: PaletState = {
    palets: [],
    palet: null,
    contador: null,
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
    }))
)

export function paletReducer(state: any, action: any) {
    return _paletReducer(state, action);
}