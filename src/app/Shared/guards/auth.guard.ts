import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { LoginState } from 'src/app/login/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loginState$: LoginState;

constructor(private store: Store<AppState>, private router:Router ){
  this.store.select('loginApp').subscribe(login => this.loginState$ = login);
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.loginState$.loggedIn){
        this.router.navigate(['/login']);
        return false;
      }

      return true;
  }
  
}
