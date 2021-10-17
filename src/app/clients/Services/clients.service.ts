import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  save(client: Client){
    const headers= new HttpHeaders({'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + '/clients', client, {headers: headers});
  }

  getClients(): Observable<Client[]>{
    return this.get().pipe(
        catchError(this.handleError<Client[]>('getClients', []))
      );
  }

  getClient(id: number): Observable<Client>{
    return this.httpClient.get<Client>(this.API_ENDPOINT + '/getClient/'+id).pipe(
      catchError(this.handleError<Client>(`getClient id=${id}`))
    );
  }

  updateClient(client: Client): Observable<Client>{
    return this.httpClient.put<Client>(this.API_ENDPOINT, client, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateClient'))
    );
  }

  addClient(client:Client): Observable<Client>{
    /* return this.userExist(user).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw throwError('That email is already assigned to another user.');
      }
      else { */
    return this.httpClient.post<Client>(this.API_ENDPOINT+'/clients', client, this.httpOptions).pipe(
      catchError(this.handleError<Client>('addClient'))
    );
  }

  deleteClient(client: Client | number): Observable<Client>{
    const id = typeof client === 'number' ? client : client.client_id;

    return this.httpClient.delete<Client>(this.API_ENDPOINT + '/getClient/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Client>('deleteClient'))
    );
  }

  /* private log(message: string) {
    this.messageService.add(`ClientService: ${message}`);
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
/*       this.log(`${operation} failed: ${error.message}`);
 */      return of(result as T);
    };
  }

}
