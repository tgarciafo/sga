import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Credentials } from '../../login/models/credentials';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_ENDPOINT = "http://localhost/sga/public/api";

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUsers(){
    return this.http.get<User[]>(this.API_ENDPOINT + '/users');
  }

  login({ email, password }: Credentials): Observable<any> {
    return this.getUsers().pipe(
        map((users) => {
          const user = users.find(x => x.email === email && x.password === password);
          if (user !== undefined){
            return user;
          } else
          {
            throw throwError('Invalid username or password');
          }         
        })
      );      
  }

  /**
   * Función que devuelve un usuario.
   * @param id - Identificador del usuario
   * @return Observable<User>
   */
  getUser(id: number): Observable<User> {
/*     const url = `${this.API_ENDPOINT}/getUser/${id}`;
 */    return this.http.get<User>(this.API_ENDPOINT + '/getUser/'+id).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /**
   * Función que actualiza un usuario.
   * @param user - usuario a actualizar
   * @return Observable<User>
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.API_ENDPOINT, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Función que comprueba si existe un usuario.
   * @param user - usuario a añadir
   * @return Observable<boolean>
   */
  userExist(user: User): Observable<boolean> {
    return this.http.get<User[]>(this.API_ENDPOINT + '/users').pipe(
      map((users) => {
        if (users.find(x => x.email === user.email) === undefined)
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

  /**
   * Función que añade un usuario.
   * @param user - usuario a añadir
   * @return Observable<User>
   */
  addUser(user: User): Observable<any> {
    return this.userExist(user).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw throwError('That email is already assigned to another user.');
      }
      else {
        return this.http.post<User>(this.API_ENDPOINT, user, this.httpOptions).pipe(
          catchError(this.handleError<User>('addUser'))
        );
      }
      })
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
