import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllProductes } from '../../actions';
import { ProducteState } from '../../reducers';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';

@Component({
  selector: 'app-productes-registrats',
  templateUrl: './productes-registrats.component.html',
  styleUrls: ['./productes-registrats.component.css']
})
export class ProductesRegistratsComponent implements OnInit {

  productState$: ProducteState;

  alertMsg: string;
      
  isAlert: boolean = false;

  constructor(private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.webSocketService.producteEven.subscribe(res => {
      this.store.dispatch(getAllProductes());
      this.isAlert = true;
      this.alertMsg = 'Nou producte creat';
    })
  }

  close(){
    this.isAlert = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProductes());
  }

}
