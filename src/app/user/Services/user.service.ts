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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}  

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


  getUser(id: number): Observable<User> {
   return this.http.get<User>(this.API_ENDPOINT + '/getUser/'+id).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.API_ENDPOINT, user, this.httpOptions).pipe(
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
        throw throwError('That email is already assigned to another user.');
      }
      else {
        return this.http.post<User>(this.API_ENDPOINT+'/users', user, this.httpOptions).pipe(
          catchError(this.handleError<User>('addUser'))
        );
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
}
