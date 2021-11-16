import { createAction, props } from '@ngrx/store';
import { Palet } from 'src/app/palets/models/palet';
import { Planification } from '../models/planification';


export const createPlanification = createAction(
    '[Planification] Create Planification',
    props<{ planification: Planification }>()
);

export const createPlanificationSuccess = createAction(
    '[Planification] Create Planification success',
    props<{ planification: Planification }>()
);
export const createPlanificationError = createAction(
    '[Planification] Create Planification error',
    props<{payload: any}>()
);

export const editPlanification = createAction(
    '[Planification] Edit Planification',
    props<{ id: number, planification: Planification }>()
);

export const editPlanificationSuccess = createAction(
    '[Planification] Edit Planification Success',
    props<{ id: number, planification: Planification }>()
);

export const editPlanificationError = createAction(
    '[Planification] Edit Planification Error',
    props<{ payload: any }>()
);

export const deletePlanification = createAction(
    '[Planification] Delete Planification',
    props<{ product_id:number, albara_sortida: string }>()
);

export const deletePlanificationSuccess = createAction(
    '[Planification] Delete Planification Success',
    props<{ planification: Planification }>()
);

export const deletePlanificationError = createAction(
    '[Planification] Delete Planification Error',
    props<{ payload:any }>()
);

export const getAllPlanifications = createAction(
    '[Planification] Get all');

export const getAllPlanificationsSuccess = createAction(
    '[Planification] Get all success',
    props<{ planifications: Planification[] }>()
);

export const getAllPlanificationsError = createAction(
    '[Planification] Get all error',
    props<{payload: any}>()
);

export const getPlanification = createAction(
    '[Planification] Get Planification',
props<{ planification: Planification }>());

export const getPlanificationSuccess = createAction(
    '[Planification] Get Planification success',
    props<{ consultaPlanification: any[] }>()
);

export const getPlanificationError = createAction(
    '[Planification] Get Planification error',
    props<{payload: any}>()
);

export const getPlanificationSortida = createAction(
    '[Planification] Get Planification Sortida',
props<{ albara_sortida: string }>());

export const getPlanificationSortidaSuccess = createAction(
    '[Planification] Get Planification Sortida success',
    props<{ planifications: Planification[] }>()
);

export const getPlanificationSortidaError = createAction(
    '[Planification] Get Planification Sortida error',
    props<{payload: any}>()
);

export const comptador = createAction(
    '[Planification] Comptador',
    props<{ planifications: Planification[]}>()
);

export const comptadorSuccess = createAction(
    '[Planification] Comptador success',
    props<{ num_pal: number | unknown }>()
);
export const comptadorError = createAction(
    '[Planification] Comptador error',
    props<{payload: any}>()
);

export const deleteLinePlanification = createAction(
    '[Planification] Delete Line Planification',
    props<{ palet: Palet }>()
);

export const deleteLinePlanificationSuccess = createAction(
    '[Planification] Delete Line Planification Success',
    props<{ albara_sortida: string }>()
);

export const deleteLinePlanificationError = createAction(
    '[Planification] Delete Line Planification Error',
    props<{ payload:any }>()
);

export const consultaPlanifications = createAction(
    '[Planification] Consulta Planifications');

export const consultaPlanificationsSuccess = createAction(
    '[Planification] Consulta Planifications Success',
    props<{ consultaPlanifications: any[] }>()
);

export const consultaPlanificationsError = createAction(
    '[Planification] Consulta Planifications Error',
    props<{ payload:any }>()
);

export const deleteEntirePlanification = createAction(
    '[Planification] Delete Entire Planification',
    props<{ albara_sortida: string }>()
);

export const deleteEntirePlanificationSuccess = createAction(
    '[Planification] Delete Entire Planification Success',
    props<{ planification: Planification }>()
);

export const deleteEntirePlanificationError = createAction(
    '[Planification] Delete Entire Planification Error',
    props<{ payload:any }>()
);