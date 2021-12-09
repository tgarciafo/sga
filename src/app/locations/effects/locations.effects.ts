import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LocationActions from '../actions';
import { LocationsService } from '../Services/locations.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { deleteLocationSuccess, editLocationSuccess } from '../actions';

@Injectable()
export class LocationsEffects {

    constructor(
        private actions$: Actions,
        private locationsService: LocationsService,
        private router: Router
    ) { }

    getLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.getAllLocations, deleteLocationSuccess, editLocationSuccess),
            mergeMap(() =>
                this.locationsService.get().pipe(
                    map((locations) => LocationActions.getAllLocationsSuccess({ locations })),
                    catchError((err) => of(LocationActions.getAllLocationsError({ payload: err })))
                ))
        ));

    createLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.createLocation),
            mergeMap(action =>
                this.locationsService.addLocation(action.location).pipe(
                    map((location) => LocationActions.createLocationSuccess({ location: location })),
                    catchError((err)=> of(LocationActions.createLocationError({payload: err})))
                ))
        )
    );

    deleteLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.deleteLocation),
            mergeMap(({id}) =>
                this.locationsService.deleteLocation(id).pipe(
                    map(() => LocationActions.deleteLocationSuccess({ id } )),
                    catchError((err) => of(LocationActions.deleteLocationError({payload: err})))
                ))
        )
    );

    editLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.editLocation),
            mergeMap(({id, location}) =>
                this.locationsService.updateLocation(id, location).pipe(
                    map(() => LocationActions.editLocationSuccess({ id, location } )),
                    catchError((err) => of(LocationActions.editLocationError({payload: err})))
                ))
        )
    );

    getLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.getLocation),
            mergeMap((action) =>
                this.locationsService.getLocation(action.location.location_id).pipe(
                    map((location) => LocationActions.getLocationSuccess({ location })),
                    catchError((err) => of(LocationActions.getLocationError({ payload: err })))
                ))
        ));

        redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
