import { createReducer, on } from '@ngrx/store';
import { Block } from '../models/block';
import {
    createBlock, getBlock, getBlockError, getBlockSuccess, 
    deleteBlock, deleteBlockSuccess, deleteBlockError, getAllBlocks, getAllBlocksSuccess,
    getAllBlocksError, createBlockSuccess, createBlockError
} from '../actions/block.action';

export interface BlockState{
    blocks: Block[];
    block: Block | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: BlockState = {
    blocks: [],
    block: null,
    loading: false,
    loaded: false,
    error: null
};

const _blockReducer = createReducer(
    initialState,
    on(createBlock, state => ({ ...state, loading: true })),
    on(createBlockSuccess, (state, { block }) => ({
        ...state,
        loading: false,
        loaded: true,
        blocks: [...state.blocks, block]
    })),
    on(createBlockError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteBlock,  state => ({ ...state, loading: true })),
    on(deleteBlockSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: true,
        blocks: [...state.blocks.filter(block => block.block_id !== id)]
    })),
    on(deleteBlockError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getAllBlocks, state => ({ ...state, loading: true })),
    on(getAllBlocksSuccess, (state, { blocks }) => ({
        ...state,
        loading: false,
        loaded: true,
        blocks: [...blocks]
    })),
    on(getAllBlocksError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getBlock, state => ({ ...state, loading: true })),
    on(getBlockSuccess, (state, { block } ) => ({
        ...state,
        loading: false,
        loaded: true,
        block: block,
    })),
    on(getBlockError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    }))
)

export function blockReducer(state: any, action: any) {
    return _blockReducer(state, action);
}