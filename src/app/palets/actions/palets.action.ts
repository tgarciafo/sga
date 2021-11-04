import { createAction, props } from '@ngrx/store';
import { Palet } from '../models/palet';
import { Sortida } from '../models/sortida';

export const createPalet = createAction(
    '[Palet] Create Palet',
    props<{ palet: Palet }>()
);

export const createPaletSuccess = createAction(
    '[Palet] Create Palet success',
    props<{ palet: Palet }>()
);
export const createPaletError = createAction(
    '[Palet] Create Palet error',
    props<{payload: any}>()
);

export const contador = createAction(
    '[Palet] Contador',
    props<{ palet: Palet}>()
);

export const contadorSuccess = createAction(
    '[Palet] Contador success',
    props<{ num_pal: number | unknown }>()
);
export const contadorError = createAction(
    '[Palet] Contador error',
    props<{payload: any}>()
);

export const consultaEntrades = createAction(
    '[Palet] Consulta Entrades',
    props<{ data: Date, data2: Date }>()
);

export const consultaEntradesSuccess = createAction(
    '[Palet] Consulta Entrades success',
    props<{ consulta: any[] }>()
);
export const consultaEntradesError = createAction(
    '[Palet] Consulta Entrades error',
    props<{payload: any}>()
);

export const consultaPalEntrades = createAction(
    '[Palet] Consulta Palets Entrades',
    props<{ albara: string }>()
);

export const consultaPalEntradesSuccess = createAction(
    '[Palet] Consulta Palets Entrades success',
    props<{ consultaPal: any[] }>()
);
export const consultaPalEntradesError = createAction(
    '[Palet] Consulta Palets Entrades error',
    props<{payload: any}>()
);

export const consultaPalResta = createAction(
    '[Palet] Consulta Palets Resta',
    props<{ product_id: number }>()
);

export const consultaPalRestaSuccess = createAction(
    '[Palet] Consulta Palets Resta success',
    props<{ palResta: number }>()
);
export const consultaPalRestaError = createAction(
    '[Palet] Consulta Palets Resta error',
    props<{payload: any}>()
);

export const sortida = createAction(
    '[Palet] Sortida',
    props<{ sortida: Sortida }>()
);

export const sortidaSuccess = createAction(
    '[Palet] Sortida success',
    props<{ palet: any }>()
);
export const sortidaError = createAction(
    '[Palet] Sortida error',
    props<{payload: any}>()
);

export const consultaSortides = createAction(
    '[Palet] Consulta Sortides',
    props<{ data: Date, data2: Date }>()
);

export const consultaSortidesSuccess = createAction(
    '[Palet] Consulta Sortides success',
    props<{ consultaS: any[] }>()
);
export const consultaSortidesError = createAction(
    '[Palet] Consulta Sortides error',
    props<{payload: any}>()
);

export const consultaPalSortides = createAction(
    '[Palet] Consulta Palets Sortides',
    props<{ albara: string }>()
);

export const consultaPalSortidesSuccess = createAction(
    '[Palet] Consulta Palets Sortides success',
    props<{ consultaPalS: any[] }>()
);
export const consultaPalSortidesError = createAction(
    '[Palet] Consulta Palets Sortides error',
    props<{payload: any}>()
);