import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Bloquejat } from '../models/bloquejat';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { Palet } from '../../palets/models/palet';

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

  addBloquejat(bloquejat: Bloquejat): Observable<Bloquejat>{
    return this.paletExist(bloquejat).pipe(
      exhaustMap((exist) => {
      if (exist){
        return this.HttpClient.post<Bloquejat>(this.API_ENDPOINT+'/bloquejats', bloquejat, this.httpOptions).pipe(
          catchError(this.handleError<Bloquejat>('addBloquejat'))
        );
      }
      else {
        throw new Error('Aquest palet no està entrat a la base de dades o ja ha estat expedit.');
      }
    })
    );
  }

  deleteBloquejat(bloquejat_id: number): Observable<Bloquejat>{

    return this.HttpClient.delete<Bloquejat>(this.API_ENDPOINT + '/bloquejats/'+ bloquejat_id, this.httpOptions).pipe(
      catchError(this.handleError<Bloquejat>('deleteBloquejat'))
    );
  }  

  consultaBloquejats(client_id: number | undefined): Observable<Array<any>>{
    return this.HttpClient.get<Array<any>>(this.API_ENDPOINT + '/getBloquejats/'+ client_id, this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('consultaPaletsBloquejats'))
    );
  }

  consultaBloquejatsEdit(): Observable<Array<any>>{
    return this.HttpClient.get<Array<any>>(this.API_ENDPOINT + '/getBloquejatsEdit').pipe(
      catchError(this.handleError<Array<any>>('consultaPaletsBloquejatsEdit'))
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

  paletExist(bloquejat: Bloquejat): Observable<boolean> {

    return this.HttpClient.get<Palet[]>(this.API_ENDPOINT + '/palets').pipe(
      map((palets) => {
        if ((palets.find(x => x.sscc === bloquejat.sscc) === undefined))
        {
          return false;
        }
        else
        {
          if((palets.find(x => x.sscc === bloquejat.sscc && x.albara_sortida != null))){
          return false;
          }
          else {
           return true;
          }
        }
      })
    );
  }

}
