import { createAction, props } from '@ngrx/store';
import { Client } from '../models/client';

export const createClient = createAction(
    '[Client] Create Client',
    props<{ client: Client }>()
);

export const createClientSuccess = createAction(
    '[Client] Create Client success',
    props<{ client: Client }>()
);
export const createClientError = createAction(
    '[Client] Create Client error',
    props<{payload: any}>()
);

export const editClient = createAction(
    '[Client] Edit Client',
    props<{ id: number, client: Client }>()
);

export const editClientSuccess = createAction(
    '[Client] Edit Client Success',
    props<{ id: number, client: Client }>()
);

export const editClientError = createAction(
    '[Client] Edit Client Error',
    props<{ payload: any }>()
);

export const deleteClient = createAction(
    '[Client] Delete Client',
    props<{ id:number }>()
);

export const deleteClientSuccess = createAction(
    '[Client] Delete Client Success',
    props<{ id:number }>()
);

export const deleteClientError = createAction(
    '[Client] Delete Client Error',
    props<{ payload:any }>()
);

export const getAllClients = createAction('[Client] Get all');

export const getAllClientsSuccess = createAction(
    '[Client] Get all success',
    props<{ clients: Client[] }>()
);

export const getAllClientsError = createAction(
    '[Client] Get all error',
    props<{payload: any}>()
);

export const getClient = createAction(
    '[Client] Get Client',
props<{ client: Client }>());

export const getClientSuccess = createAction(
    '[Client] Get Client success',
    props<{ client: Client }>()
);

export const getClientError = createAction(
    '[Client] Get Client error',
    props<{payload: any}>()
);
