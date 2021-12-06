import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Palet } from '../models/palet';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap} from 'rxjs/operators';
import { Sortida } from '../models/sortida';

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

  getPalet(sscc: number | undefined): Observable<Palet>{
    return this.httpClient.get<Palet>(this.API_ENDPOINT + '/getPalet/'+sscc).pipe(
      catchError(this.handleError<Palet>(`getPalet sscc=${sscc}`))
    );
  }
  
  addPalet(palet:Palet): Observable<Palet>{
    return this.paletExist(palet).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw new Error('Aquest palet ja existeix a la base de dades.');
      }
      else {
        return this.httpClient.post<Palet>(this.API_ENDPOINT+'/palets', palet, this.httpOptions).pipe(
          catchError(this.handleError<Palet>('addPalet'))
        );
      }
    })
    );
  }

  paletExist(palet: Palet): Observable<boolean> {

    return this.httpClient.get<Palet[]>(this.API_ENDPOINT + '/palets').pipe(
      map((palets) => {
        if ((palets.find(x => x.sscc === palet.sscc) === undefined))
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
     return of(result as T);
    };
  }

  contador(palet: Palet){
    const albara = palet.albara_entrada;

    return this.httpClient.get<Number>(this.API_ENDPOINT + '/num_pal/'+ albara, this.httpOptions).pipe(
      catchError(this.handleError<Number>('contador'))
    );
  }

  consultaEntrada(data: Date, data2: Date): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/showEntries/'+ data +'/'+data2, this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('consultaEntrada'))
    );
  }


  entradesPal(albara: string): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/showPalEntries/'+ albara, this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('consultaPalEntrada'))
    );
  }

  palResta(product_id:number){

    return this.httpClient.get<number>(this.API_ENDPOINT + '/getPalResta/'+ product_id, this.httpOptions).pipe(
      catchError(this.handleError<number>('palResta'))
    );
  }

  sortidaPal(sortida: Sortida){
    return this.paletExpedit(sortida).pipe(
      exhaustMap((expedit) => {
        if (expedit == 'no existeix'){
        throw new Error('Aquest palet no és a la base de dades.');
      } else if (expedit == 'no ean'){
        throw new Error('La referència del producte no coincideix.');
      } else if (expedit == 'bloquejat'){
        throw new Error('Palet bloquejat.');
      } else if (expedit){
        throw new Error('Aquest palet ja ha estat expedit.');
      } else {
    return this.httpClient.put<Palet>(this.API_ENDPOINT + '/expeditionPal/'+ sortida.sscc + '/' + sortida.albara_sortida + '/' + sortida.data_sortida, this.httpOptions).pipe(
      catchError(this.handleError<Palet>('expeditionPal'))
    );
  }
})
);
  }

  paletExpedit(sortida: Sortida): Observable<boolean | string> {

    return this.httpClient.get<any>(this.API_ENDPOINT + '/getExpedits/' + sortida.sscc, this.httpOptions).pipe(
      map((palet) => {
        if (palet[0] === undefined)
        {
          return 'no existeix';
        } else if( palet[0].product_id != sortida.product_id) {
          return 'no ean';
        } else if(palet[0].albara_sortida == null){
            if(palet[0].bloquejat_id == null){
            return false;
            } else  {
            return 'bloquejat';
            }
        } else{
            return true;
          }          
        })
      );
  }

  consultaSortida(data: Date, data2: Date): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/showExpeditions/'+ data +'/'+data2, this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('consultaSortida'))
    );
  }


  sortidesPal(albara: string): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/showPalExpeditions/'+ albara, this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('consultaPalSortida'))
    );
  }

  /* Estocs */

  estocClient(idClient: number, data: Date): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/estocClient/' + idClient +'/'+ data , this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('estocClient'))
    );
  }

  estocProduct(product_id: number, data: Date): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/estocProduct/' + product_id + '/'+ data , this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('estocProduct'))
    );
  }

  estocUbicacio(client_id: number, location_id: number, data: Date): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/estocUbicacio/' + client_id + '/' + location_id + '/'+ data , this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('estocUbicacio'))
    );
  }

  estocAlbara(num_albara: string): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/estocAlbara/' + num_albara , this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('estocAlbara'))
    );
  }
  
  estocLot(client_id: number, product_id: number, data: Date): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/estocLot/' + client_id + '/' + product_id + '/'+ data , this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('estocLot'))
    );
  }

  consultaSSCC(num_sscc: string): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/consultaSSCC/' + num_sscc , this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('consultaSSCC'))
    );
  }

  consultaSsccProduct(product_id: number, data: Date, caducitat: Date): Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/consultaSsccProduct/' + product_id + '/'+ data + '/' + caducitat, this.httpOptions).pipe(
      catchError(this.handleError<Array<any>>('consultaSsccProduct'))
    );
  }
}
