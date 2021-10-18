import { createAction, props } from '@ngrx/store';
import { Location } from '../models/location';

export const createLocation = createAction(
    '[Location] Create Location',
    props<{ location: Location }>()
);

export const createLocationSuccess = createAction(
    '[Location] Create Location success',
    props<{ location: Location }>()
);
export const createLocationError = createAction(
    '[Location] Create Location error',
    props<{payload: any}>()
);

export const editLocation = createAction(
    '[Location] Edit Location',
    props<{ id: number, location: Location }>()
);

export const editLocationSuccess = createAction(
    '[Location] Edit Location Success',
    props<{ id: number, location: Location }>()
);

export const editLocationError = createAction(
    '[Location] Edit Location Error',
    props<{ payload: any }>()
);

export const deleteLocation = createAction(
    '[Location] Delete Location',
    props<{ id:number }>()
);

export const deleteLocationSuccess = createAction(
    '[Location] Delete Location Success',
    props<{ id:number }>()
);

export const deleteLocationError = createAction(
    '[Location] Delete Location Error',
    props<{ payload:any }>()
);

export const getAllLocations = createAction('[Location] Get all');

export const getAllLocationsSuccess = createAction(
    '[Location] Get all success',
    props<{ locations: Location[] }>()
);

export const getAllLocationsError = createAction(
    '[Location] Get all error',
    props<{payload: any}>()
);

export const getLocation = createAction(
    '[Location] Get Location',
props<{ location: Location }>());

export const getLocationSuccess = createAction(
    '[Location] Get Location success',
    props<{ location: Location }>()
);

export const getLocationError = createAction(
    '[Location] Get Location error',
    props<{payload: any}>()
);
