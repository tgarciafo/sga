import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProducteActions from '../actions';
import { ProductesService } from '../Services/productes.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductesEffects {

    constructor(
        private actions$: Actions,
        private productesService: ProductesService,
        private router: Router
    ) { }

    getProductes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProducteActions.getAllProductes, ProducteActions.deleteProducteSuccess, ProducteActions.editProducteSuccess),
            mergeMap(() =>
                this.productesService.get().pipe(
                    map((productes) => ProducteActions.getAllProductesSuccess({ productes })),
                    catchError((err) => of(ProducteActions.getAllProductesError({ payload: err })))
                ))
        ));

    createProductes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProducteActions.createProducte),
            mergeMap(action =>
                this.productesService.addProducte(action.producte).pipe(
                    map((producte) => ProducteActions.createProducteSuccess({ producte: producte })),
                    catchError((err)=> of(ProducteActions.createProducteError({payload: err})))
                ))
        )
    );

    deleteProductes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProducteActions.deleteProducte),
            mergeMap(({id}) =>
                this.productesService.deleteProducte(id).pipe(
                    map(() => ProducteActions.deleteProducteSuccess({ id } )),
                    catchError((err) => of(ProducteActions.deleteProducteError({payload: err})))
                ))
        )
    );

    editProductes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProducteActions.editProducte),
            mergeMap(({id, producte}) =>
                this.productesService.updateProducte(id, producte).pipe(
                    map(() => ProducteActions.editProducteSuccess({ id, producte } )),
                    catchError((err) => of(ProducteActions.editProducteError({payload: err})))
                ))
        )
    );

    getProducte$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProducteActions.getProducte),
            mergeMap((action) =>
                this.productesService.getProducte(action.producte.product_id).pipe(
                    map((producte) => ProducteActions.getProducteSuccess({ producte })),
                    catchError((err) => of(ProducteActions.getProducteError({ payload: err })))
                ))
        ));

    getId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProducteActions.getId),
            mergeMap((action) =>
                this.productesService.eanToId(action.ean).pipe(
                    map((producte) => ProducteActions.getIdSuccess({ producte })),
                    catchError((err) => of(ProducteActions.getIdError({ payload: err })))
        ))
    ));

    getClientProducte$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProducteActions.getClientProducte),
            mergeMap((action) =>
                this.productesService.getClientProductes(action.client_id).pipe(
                    map((productes) => ProducteActions.getClientProducteSuccess({ productes: productes })),
                    catchError((err) => of(ProducteActions.getClientProducteError({ payload: err })))
                ))
        ));

    redirectTo(uri: string): void {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([uri]));
    }
}
