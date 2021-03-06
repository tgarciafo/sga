import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Credentials } from '../../login/models/credentials';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_ENDPOINT = "http://localhost/sga/public/api";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}  

  getUsers(){
    return this.http.get<any[]>(this.API_ENDPOINT + '/getUsers');
  }

  login({ email, password }: Credentials): Observable<any> {
    return this.getUsers().pipe(
        map((users) => {
          const user = users.find(x => x.email === email && x.password === password);
          if (user !== undefined){
            return user;
          } else
          {
            throw new Error("L'usuari o la contrasenya són incorrectes.");
          }         
        })
      );      
  }


  getUser(id: number): Observable<User> {
   return this.http.get<User>(this.API_ENDPOINT + '/getUser/'+id).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.API_ENDPOINT + '/users/' + id, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

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

  addUser(user: User): Observable<any> {
    return this.userExist(user).pipe(
      exhaustMap((exist) => {
      if (exist){
        throw new Error('Aquest correu electrònic està assignat a un altre usuari.');
      }
      else {
        return this.http.post<User>(this.API_ENDPOINT+'/users', user, this.httpOptions).pipe(
          catchError(this.handleError<User>('addUser'))
        );
      }
      })
    );
  }

  deleteUser(user: User | number): Observable<User>{
    const id = typeof user === 'number' ? user : user.user_id;

    return this.http.delete<User>(this.API_ENDPOINT + '/users/'+id, this.httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
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
