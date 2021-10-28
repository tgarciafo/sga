import { createReducer, on } from '@ngrx/store';
import { Planification } from '../models/planification';
import {
    createPlanification, getPlanification, getPlanificationError, getPlanificationSuccess, editPlanification, editPlanificationError, editPlanificationSuccess,
    deletePlanification, deletePlanificationSuccess, deletePlanificationError, getAllPlanifications, getAllPlanificationsSuccess,
    getAllPlanificationsError, createPlanificationSuccess, createPlanificationError
} from '../actions/planification.action';

export interface PlanificationState{
    planifications: Planification[];
    planification: Planification | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: PlanificationState = {
    planifications: [],
    planification: null,
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
        planifications: [...state.planifications, planification]
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
        })]
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
    on(deletePlanificationSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: true,
        planifications: [...state.planifications.filter(planification => planification.planification_id !== id)]
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
        planifications: [...planifications]
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
    on(getPlanificationSuccess, (state, { planification } ) => ({
        ...state,
        loading: false,
        loaded: true,
        planification: planification,
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
    }))
)

export function planificationReducer(state: any, action: any) {
    return _planificationReducer(state, action);
}