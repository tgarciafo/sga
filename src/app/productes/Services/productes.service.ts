import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producte } from '../models/producte';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductesService {

  API_ENDPOINT = 'http://localhost/sga/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get<Producte[]>(this.API_ENDPOINT + '/products');
  }

  save(producte: Producte){
    const headers= new HttpHeaders({'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + '/products', producte, {headers: headers});
  }

  getProductes(): Observable<Producte[]>{
    return this.get().pipe(
        catchError(this.handleError<Producte[]>('getProducts', []))
      );
  }

  getProducte(id: number | undefined): Observable<Producte>{
    return this.httpClient.get<Producte>(this.API_ENDPOINT + '/getProduct/'+id).pipe(
      catchError(this.handleError<Producte>(`getProduct id=${id}`))
    );
  }

  updateProducte(producte: Producte): Observable<Producte>{
    return this.httpClient.put<Producte>(this.API_ENDPOINT, producte, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateProducte'))
    );
  }

  addProducte(producte:Producte): Observable<Producte>{
    /* return this.userExist(user).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw throwError('That email is already assigned to another user.');
      }
      else { */
    return this.httpClient.post<Producte>(this.API_ENDPOINT+'/products', producte, this.httpOptions).pipe(
      catchError(this.handleError<Producte>('addProducte'))
    );
  }

  deleteProducte(producte: Producte | number): Observable<Producte>{
    const id = typeof producte === 'number' ? producte : producte.product_id;

    return this.httpClient.delete<Producte>(this.API_ENDPOINT + '/getProduct/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Producte>('deleteProducte'))
    );
  }

  
  eanToId(ean: number){
    return this.httpClient.get<Producte>(this.API_ENDPOINT + '/showId/'+ean, this.httpOptions).pipe(
      catchError(this.handleError<Producte>(`getId ean=${ean}`))
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
