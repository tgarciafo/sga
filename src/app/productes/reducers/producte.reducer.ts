import { createReducer, on } from '@ngrx/store';
import { Producte } from '../models/producte';
import {
    createProducte, getProducte, getProducteError, getProducteSuccess, editProducte, editProducteError, editProducteSuccess,
    deleteProducte, deleteProducteSuccess, deleteProducteError, getAllProductes, getAllProductesSuccess,
    getAllProductesError, createProducteSuccess, createProducteError, getId, getIdError,getIdSuccess, getClientProducte,
    getClientProducteError,getClientProducteSuccess
} from '../actions/productes.action';

export interface ProducteState{
    productes: any[];
    producte: Producte | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: ProducteState = {
    productes: [],
    producte: null,
    loading: false,
    loaded: false,
    error: null
};

const _producteReducer = createReducer(
    initialState,
    on(createProducte, state => ({ ...state, loading: true })),
    on(createProducteSuccess, (state, { producte }) => ({
        ...state,
        loading: false,
        loaded: true,
        productes: [...state.productes, producte]
    })),
    on(createProducteError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(editProducte,state => ({ ...state, loading: true })),
    on(editProducteSuccess, (state, { id, producte }) => ({
        ...state,
        loading: false,
        loaded: false,
        productes: [...state.productes.map((_producte) => {
            if (_producte.product_id === id) {
                return {
                    ...producte
                };
            } else {
                return _producte;
            }
        })]
    })),
    on(editProducteError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteProducte,  state => ({ ...state, loading: true })),
    on(deleteProducteSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: true,
        productes: [...state.productes.filter(producte => producte.product_id !== id)]
    })),
    on(deleteProducteError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getAllProductes, state => ({ ...state, loading: true })),
    on(getAllProductesSuccess, (state, { productes }) => ({
        ...state,
        loading: false,
        loaded: true,
        productes: [...productes]
    })),
    on(getAllProductesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getProducte, state => ({ ...state, loading: true })),
    on(getProducteSuccess, (state, { producte } ) => ({
        ...state,
        loading: false,
        loaded: true,
        producte: producte,
    })),
    on(getProducteError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getId, state => ({ ...state, loading: true })),
    on(getIdSuccess, (state, { producte } ) => ({
        ...state,
        loading: false,
        loaded: true,
        producte: producte
    })),
    on(getIdError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getClientProducte, state => ({ ...state, loading: true })),
    on(getClientProducteSuccess, (state, { productes }) => ({
        ...state,
        loading: false,
        loaded: true,
        productes: [...productes]
    })),
    on(getClientProducteError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
)

export function producteReducer(state: any, action: any) {
    return _producteReducer(state, action);
}