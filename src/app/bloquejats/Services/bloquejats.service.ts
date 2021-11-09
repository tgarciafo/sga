import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bloquejat } from '../models/bloquejat';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloquejatsService {

  API_ENDPOINT = 'http://localhost/sga/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private HttpClient: HttpClient) { }

  get(){
    return this.HttpClient.get<Bloquejat[]>(this.API_ENDPOINT + '/bloquejats');
  }

  getBloquejats(): Observable<Bloquejat[]>{
    return this.get().pipe(
        catchError(this.handleError<Bloquejat[]>('getBloquejats', []))
      );
  }

  getBloquejat(id: number | undefined): Observable<Bloquejat>{
    return this.HttpClient.get<Bloquejat>(this.API_ENDPOINT + '/getBloquejat/'+id).pipe(
      catchError(this.handleError<Bloquejat>(`getBloquejat id=${id}`))
    );
  }

  addBloquejat(sscc: number): Observable<Bloquejat>{
    return this.HttpClient.post<Bloquejat>(this.API_ENDPOINT+'/bloquejats', sscc, this.httpOptions).pipe(
      catchError(this.handleError<Bloquejat>('addBloquejat'))
    );
  }

  deleteBloquejat(bloquejat_id: number): Observable<Bloquejat>{

    return this.HttpClient.delete<Bloquejat>(this.API_ENDPOINT + '/bloquejats/'+ bloquejat_id, this.httpOptions).pipe(
      catchError(this.handleError<Bloquejat>('deleteBloquejat'))
    );
  }

  /* private log(message: string) {
    this.messageService.add(`Bloquejatservice: ${message}`);
  } */

  

  consultaBloquejats(): Observable<Array<any>>{
    return this.HttpClient.get<Array<any>>(this.API_ENDPOINT + '/getBloquejats').pipe(
      catchError(this.handleError<Array<any>>('consultaPaletsBloquejats'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
/*       this.log(`${operation} failed: ${error.message}`);
 */      return of(result as T);
    };
  }

}
