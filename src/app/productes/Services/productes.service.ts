import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producte } from '../models/producte';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap} from 'rxjs/operators';

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

  getProductes(): Observable<any[]>{
    return this.get().pipe(
        catchError(this.handleError<any[]>('getProducts', []))
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
    return this.productExist(producte).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw new Error('Ja hi ha un producte registrat amb aquesta referència o ean.');
      }
      else {
        return this.httpClient.post<Producte>(this.API_ENDPOINT+'/products', producte, this.httpOptions).pipe(
          catchError(this.handleError<Producte>('addProducte'))
        );
        }
      })
    );
  }

  deleteProducte(producte: Producte | number): Observable<Producte>{
    const id = typeof producte === 'number' ? producte : producte.product_id;

    return this.httpClient.delete<Producte>(this.API_ENDPOINT + '/getProduct/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Producte>('deleteProducte'))
    );
  }

  
  eanToId(ean: number){
    return this.httpClient.get<Producte>(this.API_ENDPOINT + '/showId/'+ean).pipe(
      catchError(this.handleError<Producte>(`getId ean=${ean}`))
    );
  }

  getClientProductes( client_id: number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.API_ENDPOINT + '/getClientProduct/'+ client_id).pipe(
      catchError(this.handleError<any[]>(`getClientProduct client_id=${client_id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  productExist(producte: Producte): Observable<boolean> {
    return this.httpClient.get<Producte[]>(this.API_ENDPOINT + '/products').pipe(
      map((productes) => {
        if ((productes.find(x => x.ean == producte.ean) === undefined) && (productes.find(x => x.reference == producte.reference) === undefined))
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
