import { createAction, props } from '@ngrx/store';
import { Palet } from '../models/palet';

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
    props<{ albara_entrada: string }>()
);

export const contadorSuccess = createAction(
    '[Palet] Contador success',
    props<{ num_pal: number | unknown }>()
);
export const contadorError = createAction(
    '[Palet] Contador error',
    props<{payload: any}>()
);