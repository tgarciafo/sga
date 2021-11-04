import { createAction, props } from '@ngrx/store';
import { Block } from '../models/block';

export const createBlock = createAction(
    '[Block] Create Block',
    props<{ block: Block }>()
);

export const createBlockSuccess = createAction(
    '[Block] Create Block success',
    props<{ block: Block }>()
);
export const createBlockError = createAction(
    '[Block] Create Block error',
    props<{payload: any}>()
);

export const deleteBlock = createAction(
    '[Block] Delete Block',
    props<{ id:number }>()
);

export const deleteBlockSuccess = createAction(
    '[Block] Delete Block Success',
    props<{ id:number }>()
);

export const deleteBlockError = createAction(
    '[Block] Delete Block Error',
    props<{ payload:any }>()
);

export const getAllBlocks = createAction('[Block] Get all');

export const getAllBlocksSuccess = createAction(
    '[Block] Get all success',
    props<{ blocks: Block[] }>()
);

export const getAllBlocksError = createAction(
    '[Block] Get all error',
    props<{payload: any}>()
);

export const getBlock = createAction(
    '[Block] Get Block',
props<{ block: Block }>());

export const getBlockSuccess = createAction(
    '[Block] Get Block success',
    props<{ block: Block }>()
);

export const getBlockError = createAction(
    '[Block] Get Block error',
    props<{payload: any}>()
);
