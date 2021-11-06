import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PaletActions from '../actions';
import * as BloquejatActions from 'src/app/bloquejats/actions';
import { PaletsService } from '../Services/palets.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PaletsEffects {

    constructor(
        private actions$: Actions,
        private paletsService: PaletsService,
        private router: Router
    ) { }

    createPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.createPalet),
            mergeMap(action =>
                this.paletsService.addPalet(action.palet).pipe(
                    map((palet) => PaletActions.createPaletSuccess({ palet: palet })),
                    catchError((err)=> of(PaletActions.createPaletError({payload: err})))
                ))
        )
    );

    contadorPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.contador, PaletActions.createPaletSuccess),
            mergeMap((action) =>
                this.paletsService.contador(action.palet).pipe(
                    map((num_pal) => PaletActions.contadorSuccess({ num_pal: num_pal })),
                    catchError((err)=> of(PaletActions.contadorError({payload: err})))
                ))
        )
    );

    consultaEntradesPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.consultaEntrades),
            mergeMap((action) =>
                this.paletsService.consultaEntrada(action.data, action.data2).pipe(
                    map((consulta) => PaletActions.consultaEntradesSuccess({ consulta: consulta })),
                    catchError((err)=> of(PaletActions.consultaEntradesError({payload: err})))
                ))
        )
    );

    consultaPalEntradesPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.consultaPalEntrades),
            mergeMap((action) =>
                this.paletsService.entradesPal(action.albara).pipe(
                    map((consultaPal) => PaletActions.consultaPalEntradesSuccess({ consultaPal: consultaPal })),
                    catchError((err)=> of(PaletActions.consultaPalEntradesError({payload: err})))
                ))
        )
    );

    palRestaPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.consultaPalResta),
            mergeMap((action) =>
                this.paletsService.palResta(action.product_id).pipe(
                    map((num_pal) => PaletActions.consultaPalRestaSuccess({ palResta: num_pal })),
                    catchError((err)=> of(PaletActions.consultaPalRestaError({payload: err})))
                ))
        )
    );

    sortidaPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.sortida),
            mergeMap((action) =>
                this.paletsService.sortidaPal(action.sortida).pipe(
                    map((palet) => PaletActions.sortidaSuccess({ palet: palet })),
                    catchError((err)=> of(PaletActions.sortidaError({payload: err})))
                ))
        )
    );

    consultaSortidesPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.consultaSortides),
            mergeMap((action) =>
                this.paletsService.consultaSortida(action.data, action.data2).pipe(
                    map((consultaS) => PaletActions.consultaSortidesSuccess({ consultaS: consultaS })),
                    catchError((err)=> of(PaletActions.consultaSortidesError({payload: err})))
                ))
        )
    );

    consultaPalSortidesPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.consultaPalSortides),
            mergeMap((action) =>
                this.paletsService.sortidesPal(action.albara).pipe(
                    map((consultaPalS) => PaletActions.consultaPalSortidesSuccess({ consultaPalS: consultaPalS })),
                    catchError((err)=> of(PaletActions.consultaPalSortidesError({payload: err})))
                ))
        )
    );
    
            redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
