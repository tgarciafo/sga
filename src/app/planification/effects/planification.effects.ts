import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PlanificationActions from '../actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { PlanificationService } from '../Services/planification.service';

@Injectable()
export class PlanificationEffects {

    constructor(
        private actions$: Actions,
        private planificationService: PlanificationService,
        private router: Router
    ) { }

    getPlanifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanificationActions.getAllPlanifications),
            mergeMap(() =>
                this.planificationService.get().pipe(
                    map((planifications) => PlanificationActions.getAllPlanificationsSuccess({ planifications })),
                    catchError((err) => of(PlanificationActions.getAllPlanificationsError({ payload: err })))
                ))
        ));

    createPlanification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanificationActions.createPlanification),
            mergeMap(action =>
                this.planificationService.addPlanification(action.planification).pipe(
                    map((planification) => PlanificationActions.createPlanificationSuccess({ planification: planification })),
                    catchError((err)=> of(PlanificationActions.createPlanificationError({payload: err})))
                ))
        )
    );

    deletePlanification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanificationActions.deletePlanification),
            mergeMap(({product_id, albara_sortida}) =>
                this.planificationService.deletePlanification(product_id, albara_sortida).pipe(
                    map((planification) => PlanificationActions.deletePlanificationSuccess({ planification } )),
                    catchError((err) => of(PlanificationActions.deletePlanificationError({payload: err})))
                ))
        )
    );

    editPlanification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanificationActions.editPlanification),
            mergeMap(({id, planification}) =>
                this.planificationService.updatePlanification(planification).pipe(
                    map(() => PlanificationActions.editPlanificationSuccess({ id, planification } )),
                    catchError((err) => of(PlanificationActions.editPlanificationError({payload: err})))
                ))
        )
    );

    getPlanification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanificationActions.getPlanification, PlanificationActions.createPlanificationSuccess, PlanificationActions.deletePlanificationSuccess),
            mergeMap(({planification}) =>
                this.planificationService.getPlanification(planification).pipe(
                    map((consultaPlanification) => PlanificationActions.getPlanificationSuccess( {consultaPlanification:consultaPlanification} )),
                    catchError((err) => of(PlanificationActions.getPlanificationError({ payload: err })))
                ))
        ));

    getPlanificationsSortida$ = createEffect(() =>
    this.actions$.pipe(
        ofType(PlanificationActions.getPlanificationSortida),
        mergeMap((action) =>
            this.planificationService.getPlanifications(action.albara_sortida).pipe(
                map((planifications) => PlanificationActions.getPlanificationSortidaSuccess( {planifications} )),
                catchError((err) => of(PlanificationActions.getPlanificationSortidaError({ payload: err })))
            ))
    ));

    comptadorPlanification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanificationActions.comptador, PlanificationActions.getPlanificationSortidaSuccess),
            mergeMap((action) =>
                this.planificationService.comptador(action.planifications).pipe(
                    map((num_pal) => PlanificationActions.comptadorSuccess({ num_pal: num_pal })),
                    catchError((err)=> of(PlanificationActions.comptadorError({payload: err})))
                ))
        )
    );

        redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
