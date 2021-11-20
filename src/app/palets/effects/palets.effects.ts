import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PaletActions from '../actions';
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

    estocClientPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.estocClient),
            mergeMap((action) =>
                this.paletsService.estocClient(action.idClient, action.data).pipe(
                    map((estocClient) => PaletActions.estocClientSuccess({ estocClient: estocClient })),
                    catchError((err)=> of(PaletActions.estocClientError({payload: err})))
                ))
        )
    );

    estocProductPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.estocProduct),
            mergeMap((action) =>
                this.paletsService.estocProduct( action.product_id, action.data).pipe(
                    map((estocProduct) => PaletActions.estocProductSuccess({ estocProduct: estocProduct })),
                    catchError((err)=> of(PaletActions.estocProductError({payload: err})))
                ))
        )
    );
    
    estocUbicacioPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.estocUbicacio),
            mergeMap((action) =>
                this.paletsService.estocUbicacio( action.client_id, action.location_id, action.data).pipe(
                    map((estocUbicacio) => PaletActions.estocUbicacioSuccess({ estocUbicacio: estocUbicacio })),
                    catchError((err)=> of(PaletActions.estocUbicacioError({payload: err})))
                ))
        )
    );

    estocAlbaraPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.estocAlbara),
            mergeMap((action) =>
                this.paletsService.estocAlbara( action.num_albara).pipe(
                    map((estocAlbara) => PaletActions.estocAlbaraSuccess({ estocAlbara: estocAlbara })),
                    catchError((err)=> of(PaletActions.estocAlbaraError({payload: err})))
                ))
        )
    );

    estocLotPalets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaletActions.estocLot),
            mergeMap((action) =>
                this.paletsService.estocLot( action.client_id, action.product_id, action.data).pipe(
                    map((estocLot) => PaletActions.estocLotSuccess({ estocLot: estocLot })),
                    catchError((err)=> of(PaletActions.estocLotError({payload: err})))
                ))
        )
    );

            redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
