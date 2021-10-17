import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { User } from '../../user/models/user';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_ENDPOINT = "http://localhost/sga/public/api";

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

}
