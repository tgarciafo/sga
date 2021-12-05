import { createReducer, on } from '@ngrx/store';
import { Planification } from '../models/planification';
import {
    createPlanification, getPlanification, getPlanificationError, getPlanificationSuccess, editPlanification, editPlanificationError, editPlanificationSuccess,
    deletePlanification, deletePlanificationSuccess, deletePlanificationError, getAllPlanifications, getAllPlanificationsSuccess,
    getAllPlanificationsError, createPlanificationSuccess, createPlanificationError, getPlanificationSortida, getPlanificationSortidaError, getPlanificationSortidaSuccess,
    comptador, comptadorError, comptadorSuccess, deleteLinePlanification, deleteLinePlanificationError, deleteLinePlanificationSuccess, consultaPlanifications,
    consultaPlanificationsError, consultaPlanificationsSuccess, deleteEntirePlanification, deleteEntirePlanificationError, deleteEntirePlanificationSuccess
} from '../actions/planification.action';

export interface PlanificationState{
    planifications: Planification[];
    planification: Planification | null;
    consultaPlanification: any[];
    consultaPlanifications: any[];
    comptador: number | null | unknown;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: PlanificationState = {
    planifications: [],
    planification: null,
    consultaPlanification: [],
    consultaPlanifications: [],
    comptador: null,
    loading: false,
    loaded: false,
    error: null
};

const _planificationReducer = createReducer(
    initialState,
    on(createPlanification, state => ({ ...state, loading: true })),
    on(createPlanificationSuccess, (state, { planification }) => ({
        ...state,
        loading: false,
        loaded: true,
        planifications: [...state.planifications, planification],
        error: null
    })),
    on(createPlanificationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(editPlanification,state => ({ ...state, loading: true })),
    on(editPlanificationSuccess, (state, { id, planification }) => ({
        ...state,
        loading: false,
        loaded: false,
        planifications: [...state.planifications.map((_planification) => {
            if (_planification.planification_id === id) {
                return {
                    ...planification
                };
            } else {
                return _planification;
            }
        })],
        error: null
    })),
    on(editPlanificationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deletePlanification,  state => ({ ...state, loading: true })),
    on(deletePlanificationSuccess, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        planifications: [...state.planifications.filter(plani => ((plani.albara_sortida !== action.planification.albara_sortida) && (plani.product_id !== action.planification.product_id)))],
        error: null
    })),
    on(deletePlanificationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getAllPlanifications, state => ({ ...state, loading: true })),
    on(getAllPlanificationsSuccess, (state, { planifications }) => ({
        ...state,
        loading: false,
        loaded: true,
        planifications: [...planifications],
        error: null
    })),
    on(getAllPlanificationsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getPlanification, state => ({ ...state, loading: true })),
    on(getPlanificationSuccess, (state, { consultaPlanification } ) => ({
        ...state,
        loading: false,
        loaded: true,
        consultaPlanification: consultaPlanification,
        error: null
    })),
    on(getPlanificationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getPlanificationSortida, state => ({ ...state, loading: true })),
    on(getPlanificationSortidaSuccess, (state, { planifications} ) => ({
        ...state,
        loading: false,
        loaded: true,
        planifications: planifications,
        error: null
    })),
    on(getPlanificationSortidaError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(comptador, state => ({ ...state, loading: true })),
    on(comptadorSuccess, (state, { num_pal }) => ({
        ...state,
        loading: false,
        loaded: true,
        comptador: num_pal,
        error: null
    })),
    on(comptadorError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteLinePlanification,  state => ({ ...state, loading: true })),
    on(deleteLinePlanificationSuccess, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        planifications: [...state.planifications.slice(1)],
        error: null
    })),
    on(deleteLinePlanificationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(consultaPlanifications, state => ({ ...state, loading: true })),
    on(consultaPlanificationsSuccess, (state, { consultaPlanifications } ) => ({
        ...state,
        loading: false,
        loaded: true,
        consultaPlanifications: consultaPlanifications,
        error: null
    })),
    on(consultaPlanificationsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteEntirePlanification,  state => ({ ...state, loading: true })),
    on(deleteEntirePlanificationSuccess, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        planifications: [...state.planifications.filter(plani => plani.albara_sortida !== action.planification.albara_sortida)],
        error: null
    })),
    on(deleteEntirePlanificationError, (state, { payload }) => ({
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

export function planificationReducer(state: any, action: any) {
    return _planificationReducer(state, action);
}