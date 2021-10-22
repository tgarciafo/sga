import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Palet } from '../models/palet';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaletsService {

  API_ENDPOINT = 'http://localhost/sga/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get<Palet[]>(this.API_ENDPOINT + '/palets');
  }

  save(palet: Palet){
    const headers= new HttpHeaders({'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + '/palets', palet, {headers: headers});
  }

  getPalets(): Observable<Palet[]>{
    return this.get().pipe(
        catchError(this.handleError<Palet[]>('getPalets', []))
      );
  }

  getPalet(id: number | undefined): Observable<Palet>{
    return this.httpClient.get<Palet>(this.API_ENDPOINT + '/getPalet/'+id).pipe(
      catchError(this.handleError<Palet>(`getPalet id=${id}`))
    );
  }
  
  addPalet(palet:Palet): Observable<Palet>{
    /* return this.userExist(user).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw throwError('That email is already assigned to another user.');
      }
      else { */
    return this.httpClient.post<Palet>(this.API_ENDPOINT+'/palets', palet, this.httpOptions).pipe(
      catchError(this.handleError<Palet>('addPalet'))
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

  contador(albara: string){
    return this.httpClient.get(this.API_ENDPOINT + '/num_pal/'+ albara, this.httpOptions).pipe(
      catchError(this.handleError<Palet>('addPalet'))
    );
  }
}
