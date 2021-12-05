import { createReducer, on } from '@ngrx/store';
import { Location } from '../models/location';
import {
    createLocation, getLocation, getLocationError, getLocationSuccess, editLocation, editLocationError, editLocationSuccess,
    deleteLocation, deleteLocationSuccess, deleteLocationError, getAllLocations, getAllLocationsSuccess,
    getAllLocationsError, createLocationSuccess, createLocationError
} from '../actions/locations.action';

export interface LocationState{
    locations: Location[];
    location: Location | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: LocationState = {
    locations: [],
    location: null,
    loading: false,
    loaded: false,
    error: null
};

const _locationReducer = createReducer(
    initialState,
    on(createLocation, state => ({ ...state, loading: true })),
    on(createLocationSuccess, (state, { location }) => ({
        ...state,
        loading: false,
        loaded: true,
        locations: [...state.locations, location],
        error: null
    })),
    on(createLocationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(editLocation,state => ({ ...state, loading: true })),
    on(editLocationSuccess, (state, { id, location }) => ({
        ...state,
        loading: false,
        loaded: false,
        locations: [...state.locations.map((_location) => {
            if (_location.location_id === id) {
                return {
                    ...location
                };
            } else {
                return _location;
            }
        })],
        error: null
    })),
    on(editLocationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteLocation,  state => ({ ...state, loading: true })),
    on(deleteLocationSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: true,
        locations: [...state.locations.filter(location => location.location_id !== id)],
        error: null
    })),
    on(deleteLocationError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getAllLocations, state => ({ ...state, loading: true })),
    on(getAllLocationsSuccess, (state, { locations }) => ({
        ...state,
        loading: false,
        loaded: true,
        locations: [...locations],
        error: null
    })),
    on(getAllLocationsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getLocation, state => ({ ...state, loading: true })),
    on(getLocationSuccess, (state, { location } ) => ({
        ...state,
        loading: false,
        loaded: true,
        location: location,
        error: null
    })),
    on(getLocationError, (state, { payload }) => ({
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

export function locationReducer(state: any, action: any) {
    return _locationReducer(state, action);
}