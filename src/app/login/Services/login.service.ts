import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { User } from '../../user/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
            throw new Error("L'usuari o la contrasenya són incorrectes.");
          }         
        })
      );      
  }

}
