declare var parseBarcode: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PaletState } from 'src/app/palets/reducers';
import { createBloquejat, consultaPalBloquejats, deleteBloquejat } from '../../../bloquejats/actions';
import { BloquejatState } from '../../../bloquejats/reducers';
import { Bloquejat } from '../../models/bloquejat';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bloquejar-palets',
  templateUrl: './bloquejar-palets.component.html',
  styleUrls: ['./bloquejar-palets.component.css']
})
export class BloquejarPaletsComponent implements OnInit {

  faTrashAlt = faTrashAlt;

  public sscc: FormControl;
  public bloquejarForm: FormGroup;
  public errorBloquejar: any;
  public bSubmitted: boolean;

  public bloquejat: Bloquejat;

  bloquejatState$: BloquejatState;
  paletState$: PaletState;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.store.select('bloquejatsApp').subscribe(bloquejats => this.bloquejatState$ = bloquejats);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
  }

  ngOnInit(): void {
    this.store.dispatch(consultaPalBloquejats());

    this.bSubmitted = false;
    this.sscc = new FormControl('', [Validators.required]);
    this.errorBloquejar = '';

    this.bloquejarForm = this.formBuilder.group({
      sscc: this.sscc,
    });
  }

  saveBlock(){

    this.bSubmitted = true;

    const bloquejat = this.bloquejarForm.value as Bloquejat;

    this.store.dispatch(createBloquejat({bloquejat: bloquejat}));

    this.bloquejarForm.reset();

    this.bSubmitted = false;

  }

  interpreteBarcode(){
    "use strict";

    try{

      let answer= parseBarcode(this.codi());

      answer.parsedCodeItems.forEach(this.basedades, this);

    } catch (e){
      console.log(e);
  }
    
  }

  basedades(element: any, index: any,array: any){
    const ai=element.ai;
    let data=element.data;

    if (ai=='00'){
      this.sscc.setValue(data);
    } 
  }  

  codi(){
    if (this.sscc.value != ''){
      return this.sscc.value;
    }
  }  

  eliminar(bloquejat_id: number){

    this.store.dispatch(deleteBloquejat({id:bloquejat_id}));

  }
}
