import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  API_ENDPOINT = 'http://localhost/sga/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get<Client[]>(this.API_ENDPOINT + '/clients');
  }

  getClients(): Observable<Client[]>{
    return this.get().pipe(
        catchError(this.handleError<Client[]>('getClients', []))
      );
  }

  getClient(id: number | undefined): Observable<Client>{
    return this.httpClient.get<Client>(this.API_ENDPOINT + '/getClient/'+id).pipe(
      catchError(this.handleError<Client>(`getClient id=${id}`))
    );
  }

  updateClient(id: number, client: Client): Observable<Client>{
    return this.httpClient.put<Client>(this.API_ENDPOINT + '/clients/' + id, JSON.stringify(client), this.httpOptions).pipe(
      catchError(this.handleError<any>('updateClient'))
    );
  }

  addClient(client:Client): Observable<Client>{
    return this.clientExist(client).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw new Error('Ja hi ha un client registrat amb aquest codi o descripciĆ³ de client.');
      }
      else {
        return this.httpClient.post<Client>(this.API_ENDPOINT+'/clients', client, this.httpOptions).pipe(
          catchError(this.handleError<Client>('addClient'))
    );
      }
    })
    );
  }

  deleteClient(client: Client | number): Observable<Client>{
    const id = typeof client === 'number' ? client : client.client_id;

    return this.httpClient.delete<Client>(this.API_ENDPOINT + '/clients/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Client>('deleteClient'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {

      console.error(error); 
      if (error.error instanceof Event) {
        throw error.error;
      }
      const message = `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed: ${message}`);
    };
  }

  clientExist(client: Client): Observable<boolean> {
    return this.httpClient.get<Client[]>(this.API_ENDPOINT + '/clients').pipe(
      map((clients) => {
        if ((clients.find(x => x.description_client === client.description_client) === undefined) && (clients.find(x => x.client_code === client.client_code) === undefined))
        {
          return false;
        }
        else
        {
          return true;
        }
      })
    );
  }

}
