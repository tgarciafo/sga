import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  API_ENDPOINT = 'http://localhost/sga/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get<Location[]>(this.API_ENDPOINT + '/locations');
  }

  save(location: Location){
    const headers= new HttpHeaders({'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + '/locations', location, {headers: headers});
  }

  getLocations(): Observable<Location[]>{
    return this.get().pipe(
        catchError(this.handleError<Location[]>('getLocation', []))
      );
  }

  getLocation(id: number | undefined): Observable<Location>{
    return this.httpClient.get<Location>(this.API_ENDPOINT + '/getLocation/'+id).pipe(
      catchError(this.handleError<Location>(`getLocation id=${id}`))
    );
  }

  updateLocation(location: Location): Observable<Location>{
    return this.httpClient.put<Location>(this.API_ENDPOINT, location, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  addLocation(location:Location): Observable<Location>{
    /* return this.userExist(user).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw throwError('That email is already assigned to another user.');
      }
      else { */
    return this.httpClient.post<Location>(this.API_ENDPOINT+'/locations', location, this.httpOptions).pipe(
      catchError(this.handleError<Location>('addLocation'))
    );
  }

  deleteLocation(location: Location | number): Observable<Location>{
    const id = typeof location === 'number' ? location : location.location_id;

    return this.httpClient.delete<Location>(this.API_ENDPOINT + '/getLocation/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Location>('deleteLocation'))
    );
  }

  /* private log(message: string) {
    this.messageService.add(`LocationService: ${message}`);
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
/*       this.log(`${operation} failed: ${error.message}`);
 */      return of(result as T);
    };
  }
}
