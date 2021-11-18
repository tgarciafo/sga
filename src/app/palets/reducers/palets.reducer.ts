import { createReducer, on } from '@ngrx/store';
import { Palet } from '../models/palet';
import {
    createPalet, createPaletSuccess, createPaletError, contador, contadorSuccess, contadorError, 
    consultaEntrades, consultaEntradesError, consultaEntradesSuccess, consultaPalEntrades, 
    consultaPalEntradesError, consultaPalEntradesSuccess, consultaPalResta, consultaPalRestaError,
    consultaPalRestaSuccess, sortidaError, sortidaSuccess, sortida, consultaPalSortides,consultaPalSortidesError,
    consultaPalSortidesSuccess, consultaSortides, consultaSortidesError, consultaSortidesSuccess,
    estocClient, estocClientError, estocClientSuccess, estocProduct, estocProductError, estocProductSuccess,
    estocUbicacio, estocUbicacioError, estocUbicacioSuccess, estocAlbara, estocAlbaraError, estocAlbaraSuccess
} from '../actions/palets.action';

export interface PaletState{
    palets: Palet[];
    palet: Palet | null;
    contador: number | null | unknown;
    palResta: number | null;
    consulta: any[];
    consultaPal: any[];
    consultaS: any[];
    consultaPalS: any[];
    estocClient: any[];
    estocProduct: any[];
    estocUbicacio: any[];
    estocAlbara: any[];
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
    consultaS: [],
    consultaPalS: [],
    estocClient: [],
    estocProduct: [],
    estocUbicacio: [],
    estocAlbara: [],
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
    })),
    on(sortida,state => ({ ...state, loading: true })),
    on(sortidaSuccess, (state, { palet }) => ({
        ...state,
        loading: false,
        loaded: false,
        palets: [...state.palets.map((_palet) => {
            if (_palet.sscc === palet.sscc) {
                return {
                    ...palet
                };
            } else {
                return _palet;
            }
        })]
    })),
    on(sortidaError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(consultaSortides, state => ({ ...state, loading: true })),
    on(consultaSortidesSuccess, (state, { consultaS }) => ({
        ...state,
        loading: false,
        loaded: true,
        consultaS: consultaS
    })),
    on(consultaSortidesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(consultaPalSortides, state => ({ ...state, loading: true })),
    on(consultaPalSortidesSuccess, (state, { consultaPalS }) => ({
        ...state,
        loading: false,
        loaded: true,
        consultaPalS: consultaPalS
    })),
    on(consultaPalSortidesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(estocClient, state => ({ ...state, loading: true })),
    on(estocClientSuccess, (state, { estocClient }) => ({
        ...state,
        loading: false,
        loaded: true,
        estocClient: estocClient
    })),
    on(estocClientError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(estocProduct, state => ({ ...state, loading: true })),
    on(estocProductSuccess, (state, { estocProduct }) => ({
        ...state,
        loading: false,
        loaded: true,
        estocProduct: estocProduct
    })),
    on(estocProductError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(estocUbicacio, state => ({ ...state, loading: true })),
    on(estocUbicacioSuccess, (state, { estocUbicacio }) => ({
        ...state,
        loading: false,
        loaded: true,
        estocUbicacio: estocUbicacio
    })),
    on(estocUbicacioError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(estocAlbara, state => ({ ...state, loading: true })),
    on(estocAlbaraSuccess, (state, { estocAlbara }) => ({
        ...state,
        loading: false,
        loaded: true,
        estocAlbara: estocAlbara
    })),
    on(estocAlbaraError, (state, { payload }) => ({
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