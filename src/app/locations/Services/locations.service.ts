import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

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

  updateLocation(id: number, location: Location): Observable<Location>{
    return this.httpClient.put<Location>(this.API_ENDPOINT + '/locations/' + id, JSON.stringify(location), this.httpOptions).pipe(
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  addLocation(location:Location): Observable<Location>{
    return this.locationExist(location).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw new Error('Ja hi ha una ubicació registrada amb aquesta descripció.');
      }
      else {
        return this.httpClient.post<Location>(this.API_ENDPOINT+'/locations', location, this.httpOptions).pipe(
          catchError(this.handleError<Location>('addLocation'))
        );
        }
      })
    );
  }

  deleteLocation(location: Location | number): Observable<Location>{
    const id = typeof location === 'number' ? location : location.location_id;

    return this.httpClient.delete<Location>(this.API_ENDPOINT + '/locations/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Location>('deleteLocation'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  locationExist(location: Location): Observable<boolean> {
    return this.httpClient.get<Location[]>(this.API_ENDPOINT + '/locations').pipe(
      map((locations) => {
        if ((locations.find(x => x.location_description == location.location_description) === undefined))
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
