import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../../clients/actions';
import { ClientState } from '../../../clients/reducers';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createProducte } from '../../actions';
import { Producte } from '../../models/producte';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';
import { ProducteState } from '../../reducers';
import { checkWord } from '../../../Shared/Directives/check-word.validator';

@Component({
  selector: 'app-registre-productes',
  templateUrl: './registre-productes.component.html',
  styleUrls: ['./registre-productes.component.css']
})
export class RegistreProductesComponent implements OnInit {

  public producte: Producte;

  clientState$: ClientState;
  producteState$: ProducteState;

  public client_id: FormControl;
  public ean: FormControl;
  public reference: FormControl;
  public description_prod: FormControl;
  public quantity: FormControl;
  public regProductForm: FormGroup;
  public bSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('producteApp').subscribe(products => this.producteState$ = products);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.bSubmitted = false;
    this.client_id = new FormControl('', [checkWord(/ /), Validators.required]);
    this.ean = new FormControl('', [Validators.required]);
    this.reference = new FormControl('', [Validators.required]);
    this.description_prod = new FormControl('', [Validators.required]);
    this.quantity = new FormControl('', [Validators.required]);

    this.regProductForm = this.formBuilder.group({
      client_id: this.client_id,
      ean: this.ean,
      reference: this.reference,
      description_prod: this.description_prod,
      quantity: this.quantity
    });
  }

  public saveProduct(){
    
    const form = this.regProductForm.value as Producte;

    this.bSubmitted = true;

    this.store.dispatch(createProducte({ producte:form }));

    this.regProductForm.reset();

    const alert = 'Nou producte creat';

    this.webSocketService.producteEvent({alert});

  }

}
