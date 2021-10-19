import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../../clients/actions';
import { ClientState } from '../../../clients/reducers';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createProducte } from '../../actions';
import { Producte } from '../../models/producte';

@Component({
  selector: 'app-registre-productes',
  templateUrl: './registre-productes.component.html',
  styleUrls: ['./registre-productes.component.css']
})
export class RegistreProductesComponent implements OnInit {

  public producte: Producte;

  clientState$: ClientState;

  public client_id: FormControl;
  public errorProducte: any;
  public regProductForm: FormGroup;
  public bSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.bSubmitted = false;
    this.client_id = new FormControl('', [Validators.required]);
    this.errorProducte = '';

    this.regProductForm = this.formBuilder.group({
      client_id: this.client_id
    });
  }

  public saveProduct(){
    
    const form = this.regProductForm.value as Producte;

    this.bSubmitted = true;

    this.store.dispatch(createProducte({ producte:form }));

    return this.regProductForm.reset();
    
  }

}
