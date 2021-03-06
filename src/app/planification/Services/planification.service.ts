import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Planification } from '../models/planification';

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {

  API_ENDPOINT = 'http://localhost/sga/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get<Planification[]>(this.API_ENDPOINT + '/planifications');
  }

  getPlanifications(albara_sortida:string): Observable<Planification[]>{

    return this.httpClient.get<Planification[]>(this.API_ENDPOINT + '/getPlanifications/'+albara_sortida).pipe(
      catchError(this.handleError<Planification[]>(`getPlanifications albara_sortida=${albara_sortida}`))
    );
  
  }

  getPlanification(planification: Planification | string): Observable<Array<any>>{
    
    const albara_sortida= typeof planification === 'string' ? planification : planification.albara_sortida;

    return this.httpClient.get<Array<any>>(this.API_ENDPOINT + '/getPlanification/'+albara_sortida).pipe(
      catchError(this.handleError<Array<any>>(`getPlanification albara_sortida=${albara_sortida}`))
    );
  }

  updatePlanification(planification: Planification): Observable<Planification>{
    return this.httpClient.put<Planification>(this.API_ENDPOINT, planification, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePlanification'))
    );
  }

  addPlanification(planification:Planification): Observable<Planification>{
    return this.httpClient.post<Planification>(this.API_ENDPOINT+'/planifications', planification, this.httpOptions).pipe(
      catchError(this.handleError<Planification>('addPlanification'))
    );
  }

  deletePlanification(product_id: number, albara_sortida: string): Observable<any>{

    return this.httpClient.delete<any>(this.API_ENDPOINT + '/destroy/' + product_id + '/' + albara_sortida, this.httpOptions).pipe(
      catchError(this.handleError<any>('deletePlanification'))
    );
  }

  comptador(planifications: Planification[]){

    if(planifications[0] == undefined){
        const albara = '0';
        return this.httpClient.get<Number>(this.API_ENDPOINT + '/num_pal_sortida/'+ albara, this.httpOptions).pipe(
          catchError(this.handleError<Number>('comptador'))
        );
    } else {
      const albara = planifications[0].albara_sortida;
      return this.httpClient.get<Number>(this.API_ENDPOINT + '/num_pal_sortida/'+ albara, this.httpOptions).pipe(
        catchError(this.handleError<Number>('comptador'))
      );
    }
  }

  deleteLinePlanification(palet: any): Observable<any>{

     if(palet[0] === undefined){
      
      const albara_sortida = palet.albara_sortida;
      const product_id = palet.product_id;

      return this.httpClient.delete<any>(this.API_ENDPOINT + '/destroyLine/'+ product_id + '/' + albara_sortida, this.httpOptions).pipe(
        catchError(this.handleError<any>('deleteLinePlanification')));

    } else {

      const albara_sortida=palet[0].albara_sortida;
      const product_id = palet[0].product_id;

      return this.httpClient.delete<any>(this.API_ENDPOINT + '/destroyLine/'+ product_id + '/' + albara_sortida, this.httpOptions).pipe(
        catchError(this.handleError<any>('deleteLinePlanification')));

    }   
    
  }

  consultaPlanifications(): Observable<any[]>{

    return this.httpClient.get<any[]>(this.API_ENDPOINT + '/consultaPlanifications').pipe(
      catchError(this.handleError<any[]>(`consultaPlanifications`))
    );
  
  }

  deleteEntirePlanification( albara_sortida: string): Observable<Planification>{

    return this.httpClient.delete<Planification>(this.API_ENDPOINT + '/destroyEntire/'+ albara_sortida, this.httpOptions).pipe(
      catchError(this.handleError<Planification>('deleteEntirePlanification'))
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
}
