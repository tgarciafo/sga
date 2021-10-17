import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: User | null;
                                                          
  constructor( private store: Store<AppState>) { 
    this.store.select('userApp').subscribe(userResponse => this.user = userResponse.user);
  }

  ngOnInit(): void {
  }

}
