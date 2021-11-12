import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BloquejatsActions from '../actions';
import { BloquejatsService } from '../Services/bloquejats.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { createBloquejatSuccess, deleteBloquejat } from '../actions';

@Injectable()
export class BloquejatsEffects {

    constructor(
        private actions$: Actions,
        private bloquejatsService: BloquejatsService,
        private router: Router
    ) { }

    getBloquejats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BloquejatsActions.getAllBloquejats),
            mergeMap(() =>
                this.bloquejatsService.getBloquejats().pipe(
                    map((bloquejats) => BloquejatsActions.getAllBloquejatsSuccess({ bloquejats })),
                    catchError((err) => of(BloquejatsActions.getAllBloquejatsError({ payload: err })))
                ))
        ));

    createBloquejat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BloquejatsActions.createBloquejat),
            mergeMap(action =>
                this.bloquejatsService.addBloquejat(action.bloquejat).pipe(
                    map((bloquejat) => BloquejatsActions.createBloquejatSuccess({ bloquejat: bloquejat })),
                    catchError((err)=> of(BloquejatsActions.createBloquejatError({payload: err})))
                ))
        )
    );

    deleteBloquejat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BloquejatsActions.deleteBloquejat),
            mergeMap(({id}) =>
                this.bloquejatsService.deleteBloquejat(id).pipe(
                    map(() => BloquejatsActions.deleteBloquejatSuccess({ id } )),
                    catchError((err) => of(BloquejatsActions.deleteBloquejatError({payload: err})))
                ))
        )
    );

    getBloquejat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BloquejatsActions.getBloquejat),
            mergeMap((action) =>
                this.bloquejatsService.getBloquejat(action.bloquejat.bloquejat_id).pipe(
                    map((bloquejat) => BloquejatsActions.getBloquejatSuccess({ bloquejat })),
                    catchError((err) => of(BloquejatsActions.getBloquejatError({ payload: err })))
                ))
        ));

    consultaPaletsBloquejats$ = createEffect(() =>
    this.actions$.pipe(
        ofType(BloquejatsActions.consultaPalBloquejats, createBloquejatSuccess, deleteBloquejat),
        mergeMap(() =>
            this.bloquejatsService.consultaBloquejats().pipe(
                map((consultaPalB) => BloquejatsActions.consultaPalBloquejatsSuccess({ consultaPalB: consultaPalB })),
                catchError((err)=> of(BloquejatsActions.consultaPalBloquejatsError({payload: err})))
            ))
    ));

        redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
