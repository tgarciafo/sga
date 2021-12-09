import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientActions from '../actions';
import { ClientsService } from '../Services/clients.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { deleteClientSuccess, editClientSuccess } from '../actions';

@Injectable()
export class ClientsEffects {

    constructor(
        private actions$: Actions,
        private ClientsService: ClientsService,
        private router: Router
    ) { }

    getClients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClientActions.getAllClients, deleteClientSuccess, editClientSuccess),
            mergeMap(() =>
                this.ClientsService.get().pipe(
                    map((clients) => ClientActions.getAllClientsSuccess({ clients })),
                    catchError((err) => of(ClientActions.getAllClientsError({ payload: err })))
                ))
        ));

    createClients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClientActions.createClient),
            mergeMap(action =>
                this.ClientsService.addClient(action.client).pipe(
                    map((client) => ClientActions.createClientSuccess({ client: client })),
                    catchError((err)=> of(ClientActions.createClientError({payload: err})))
                ))
        )
    );

    deleteClients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClientActions.deleteClient),
            mergeMap(({id}) =>
                this.ClientsService.deleteClient(id).pipe(
                    map(() => ClientActions.deleteClientSuccess({ id } )),
                    catchError((err) => of(ClientActions.deleteClientError({payload: err})))
                ))
        )
    );

    editClients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClientActions.editClient),
            mergeMap(({id, client}) =>
                this.ClientsService.updateClient(id, client).pipe(
                    map(() => ClientActions.editClientSuccess({ id, client } )),
                    catchError((err) => of(ClientActions.editClientError({payload: err})))
                ))
        )
    );

    getClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClientActions.getClient),
            mergeMap((action) =>
                this.ClientsService.getClient(action.client.client_id).pipe(
                    map((client) => ClientActions.getClientSuccess({ client })),
                    catchError((err) => of(ClientActions.getClientError({ payload: err })))
                ))
        ));

        redirectTo(uri: string): void {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
          }
}
