import { createAction, props } from '@ngrx/store';
import { Bloquejat } from '../models/bloquejat';

export const createBloquejat = createAction(
    '[Bloquejat] Create Bloquejat',
    props<{ sscc: number }>()
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
    '[Palet] Consulta Palets Bloquejats'
);

export const consultaPalBloquejatsSuccess = createAction(
    '[Palet] Consulta Palets Bloquejats success',
    props<{ consultaPalB: any[] }>()
);
export const consultaPalBloquejatsError = createAction(
    '[Palet] Consulta Palets Bloquejats error',
    props<{payload: any}>()
);
