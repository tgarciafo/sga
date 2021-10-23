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
            ofType(PaletActions.contador),
            mergeMap((action) =>
                this.paletsService.contador(action.albara_entrada).pipe(
                    map((num_pal) => PaletActions.contadorSuccess({ num_pal: num_pal })),
                    catchError((err)=> of(PaletActions.contadorError({payload: err})))
                ))
        )
    );

        redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
