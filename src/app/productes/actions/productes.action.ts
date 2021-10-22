import { createAction, props } from '@ngrx/store';
import { Producte } from '../models/producte';

export const createProducte = createAction(
    '[Producte] Create Producte',
    props<{ producte: Producte }>()
);

export const createProducteSuccess = createAction(
    '[Producte] Create Producte success',
    props<{ producte: Producte }>()
);
export const createProducteError = createAction(
    '[Producte] Create Producte error',
    props<{payload: any}>()
);

export const editProducte = createAction(
    '[Producte] Edit Producte',
    props<{ id: number, producte: Producte }>()
);

export const editProducteSuccess = createAction(
    '[Producte] Edit Producte Success',
    props<{ id: number, producte: Producte }>()
);

export const editProducteError = createAction(
    '[Producte] Edit Producte Error',
    props<{ payload: any }>()
);

export const deleteProducte = createAction(
    '[Producte] Delete Producte',
    props<{ id:number }>()
);

export const deleteProducteSuccess = createAction(
    '[Producte] Delete Producte Success',
    props<{ id:number }>()
);

export const deleteProducteError = createAction(
    '[Producte] Delete Producte Error',
    props<{ payload:any }>()
);

export const getAllProductes = createAction('[Producte] Get all');

export const getAllProductesSuccess = createAction(
    '[Producte] Get all success',
    props<{ productes: Producte[] }>()
);

export const getAllProductesError = createAction(
    '[Producte] Get all error',
    props<{payload: any}>()
);

export const getProducte = createAction(
    '[Producte] Get Producte',
props<{ producte: Producte }>());

export const getProducteSuccess = createAction(
    '[Producte] Get Producte success',
    props<{ producte: Producte }>()
);

export const getProducteError = createAction(
    '[Producte] Get Producte error',
    props<{payload: any}>()
);

export const getId = createAction(
    '[Producte] Get Id',
props<{ ean: number }>());

export const getIdSuccess = createAction(
    '[Producte] Get Id success',
    props<{ ean: number }>()
);

export const getIdError = createAction(
    '[Producte] Get Id error',
    props<{payload: any}>()
);
