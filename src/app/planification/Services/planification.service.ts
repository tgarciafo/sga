import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  save(planification: Planification){
    const headers= new HttpHeaders({'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + '/planification', planification, {headers: headers});
  }

  getPlanifications(): Observable<Planification[]>{
    return this.get().pipe(
        catchError(this.handleError<Planification[]>('getPlanifications', []))
      );
  }

  getPlanification(planification: Planification): Observable<Array<any>>{
    const albara_sortida= planification.albara_sortida;
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

  deletePlanification(planification: Planification | number): Observable<Planification>{
    const id = typeof planification === 'number' ? planification : planification.planification_id;

    return this.httpClient.delete<Planification>(this.API_ENDPOINT + '/getPlanification/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Planification>('deletePlanification'))
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
