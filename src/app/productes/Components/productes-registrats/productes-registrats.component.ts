import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllProductes } from '../../actions';
import { ProducteState } from '../../reducers';

@Component({
  selector: 'app-productes-registrats',
  templateUrl: './productes-registrats.component.html',
  styleUrls: ['./productes-registrats.component.css']
})
export class ProductesRegistratsComponent implements OnInit {

  productState$: ProducteState;

  constructor(private store: Store<AppState>) { 
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProductes());
  }

}
