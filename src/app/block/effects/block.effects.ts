import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BlockActions from '../actions';
import { BlockService } from '../Services/block.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BlockEffects {

    constructor(
        private actions$: Actions,
        private BlockService: BlockService,
        private router: Router
    ) { }

    getBlocks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlockActions.getAllBlocks),
            mergeMap(() =>
                this.BlockService.getBlocks().pipe(
                    map((blocks) => BlockActions.getAllBlocksSuccess({ blocks })),
                    catchError((err) => of(BlockActions.getAllBlocksError({ payload: err })))
                ))
        ));

    createBlock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlockActions.createBlock),
            mergeMap(action =>
                this.BlockService.addBlock(action.block).pipe(
                    map((block) => BlockActions.createBlockSuccess({ block: block })),
                    catchError((err)=> of(BlockActions.createBlockError({payload: err})))
                ))
        )
    );

    deleteBlock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlockActions.deleteBlock),
            mergeMap(({id}) =>
                this.BlockService.deleteBlock(id).pipe(
                    map(() => BlockActions.deleteBlockSuccess({ id } )),
                    catchError((err) => of(BlockActions.deleteBlockError({payload: err})))
                ))
        )
    );

    getBlock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlockActions.getBlock),
            mergeMap((action) =>
                this.BlockService.getBlock(action.block.block_id).pipe(
                    map((block) => BlockActions.getBlockSuccess({ block })),
                    catchError((err) => of(BlockActions.getBlockError({ payload: err })))
                ))
        ));

        redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
