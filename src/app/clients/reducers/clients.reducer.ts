import { createReducer, on } from '@ngrx/store';
import { Client } from '../models/client';
import {
    createClient, getClient, getClientError, getClientSuccess, editClient, editClientError, editClientSuccess,
    deleteClient, deleteClientSuccess, deleteClientError, getAllClients, getAllClientsSuccess,
    getAllClientsError, createClientSuccess, createClientError, addClientUser, addClientUserFailure, addClientUserSuccess
} from '../actions/clients.action';

export interface ClientState{
    clients: Client[];
    client: Client | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: ClientState = {
    clients: [],
    client: null,
    loading: false,
    loaded: false,
    error: null
};

const _clientReducer = createReducer(
    initialState,
    on(createClient, state => ({ ...state, loading: true })),
    on(createClientSuccess, (state, { client }) => ({
        ...state,
        loading: false,
        loaded: true,
        clients: [...state.clients, client],
        error: null
    })),
    on(createClientError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(editClient,state => ({ ...state, loading: true })),
    on(editClientSuccess, (state, { id, client }) => ({
        ...state,
        loading: false,
        loaded: false,
        clients: [...state.clients.map((_client) => {
            if (_client.client_id === id) {
                return {
                    ...client
                };
            } else {
                return _client;
            }
        })],
        error: null
    })),
    on(editClientError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(deleteClient,  state => ({ ...state, loading: true })),
    on(deleteClientSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: true,
        clients: [...state.clients.filter(client => client.client_id !== id)],
        error: null
    })),
    on(deleteClientError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getAllClients, state => ({ ...state, loading: true })),
    on(getAllClientsSuccess, (state, { clients }) => ({
        ...state,
        loading: false,
        loaded: true,
        clients: [...clients],
        error: null
    })),
    on(getAllClientsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    on(getClient, state => ({ ...state, loading: true })),
    on(getClientSuccess, (state, { client } ) => ({
        ...state,
        loading: false,
        loaded: true,
        client: client,
        error: null
    })),
    on(getClientError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    
    on(addClientUser, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(addClientUserSuccess, (state, {client}) => ({
        ...state,
        loading: false,
        loaded: false,
        clients: [...state.clients.map((_client) => {
            if (_client.client_id === client.client_id) {
                return {
                    ...client
                };
            } else {
                return _client;
            }
        })],
        error: null
    })),
    on(addClientUserFailure, (state, { payload }) => ({
        ...state,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        },
        pending: false,
    }))
    
)

export function clientReducer(state: any, action: any) {
    return _clientReducer(state, action);
}