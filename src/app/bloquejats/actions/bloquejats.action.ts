import { createAction, props } from '@ngrx/store';
import { Bloquejat } from '../models/bloquejat';

export const createBloquejat = createAction(
    '[Bloquejat] Create Bloquejat',
    props<{ bloquejat: Bloquejat }>()
);

export const createBloquejatSuccess = createAction(
    '[Bloquejat] Create Bloquejat success',
    props<{ bloquejat: Bloquejat }>()
);
export const createBloquejatError = createAction(
    '[Bloquejat] Create Bloquejat error',
    props<{payload: any}>()
);

export const deleteBloquejat = createAction(
    '[Bloquejat] Delete Bloquejat',
    props<{ id:number }>()
);

export const deleteBloquejatSuccess = createAction(
    '[Bloquejat] Delete Bloquejat Success',
    props<{ id:number }>()
);

export const deleteBloquejatError = createAction(
    '[Bloquejat] Delete Bloquejat Error',
    props<{ payload:any }>()
);

export const getAllBloquejats = createAction('[Bloquejat] Get all');

export const getAllBloquejatsSuccess = createAction(
    '[Bloquejat] Get all success',
    props<{ bloquejats: Bloquejat[] }>()
);

export const getAllBloquejatsError = createAction(
    '[Bloquejat] Get all error',
    props<{payload: any}>()
);

export const getBloquejat = createAction(
    '[Bloquejat] Get Bloquejat',
props<{ bloquejat: Bloquejat }>());

export const getBloquejatSuccess = createAction(
    '[Bloquejat] Get Bloquejat success',
    props<{ bloquejat: Bloquejat }>()
);

export const getBloquejatError = createAction(
    '[Bloquejat] Get Bloquejat error',
    props<{payload: any}>()
);

export const consultaPalBloquejats = createAction(
    '[Bloquejat] Consulta Palets Bloquejats',
    props<{ client_id: number | undefined }>()
);


export const consultaPalBloquejatsSuccess = createAction(
    '[Bloquejat] Consulta Palets Bloquejats success',
    props<{ consultaPalB: any[] }>()
);
export const consultaPalBloquejatsError = createAction(
    '[Bloquejat] Consulta Palets Bloquejats error',
    props<{payload: any}>()
);

export const consultaPalBloquejatsEdit = createAction(
    '[Bloquejat] Consulta Palets Bloquejats Edit');

export const consultaPalBloquejatsEditSuccess = createAction(
    '[Bloquejat] Consulta Palets Bloquejats Edit success',
    props<{ consultaPalBE: any[] }>()
);
export const consultaPalBloquejatsEditError = createAction(
    '[Bloquejat] Consulta Palets Bloquejats Edit error',
    props<{payload: any}>()
);
