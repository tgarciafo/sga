declare var parseBarcode: any;
import { Component, Input, OnInit } from '@angular/core';
import { Palet } from '../../../models/palet';
import {DatePipe} from '@angular/common';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { ProducteState } from 'src/app/productes/reducers';
import { PaletState } from 'src/app/palets/reducers';
import {createPalet, contador} from '../../../actions';
import { getAllProductes, getId } from '../../../../productes/actions';
import { getAllClients } from 'src/app/clients/actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduccio-palets2',
  templateUrl: './introduccio-palets2.component.html',
  styleUrls: ['./introduccio-palets2.component.css']
})

export class IntroduccioPalets2Component implements OnInit {

  productState$: ProducteState;
  paletState$: PaletState;
    
  currDate: string | null = '';

  @Input() num_entrada: any = '';
  @Input() location_id: any = NaN;
  @Input() show: boolean= true;
  @Input() show2: boolean= false;   

  public palet: Palet;

  public albara_entrada: FormControl;
  public barcode: FormControl;
  public barcode2: FormControl;
  public lot: FormControl;
  public ean: FormControl;
  public sscc: FormControl;
  public caducitat: FormControl;
  public client: FormControl;
  public producte: FormControl;
  public entradaForm: FormGroup;
  public errorEntrada: any;
  public bSubmitted: boolean;

  constructor(public router: Router, private store: Store<AppState>, private dp:DatePipe, private formBuilder: FormBuilder) { 
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProductes());
    this.store.dispatch(getAllClients());

    this.albara_entrada = new FormControl('', [Validators.required]);
    this.barcode = new FormControl('', [Validators.required]);
    this.barcode2 = new FormControl('', [Validators.required]);
    this.lot = new FormControl('', [Validators.required]);
    this.ean = new FormControl('', [Validators.required]);
    this.sscc = new FormControl('', [Validators.required]);
    this.caducitat = new FormControl('', [Validators.required]);
    this.client = new FormControl(this.productState$.producte?.client_id, [Validators.required]);
    this.producte = new FormControl(this.productState$.producte?.product_id, [Validators.required]);
    this.errorEntrada = '';

  this.entradaForm = this.formBuilder.group({
    albara_entrada: this.albara_entrada,
    barcode: this.barcode,
    barcode2: this.barcode2,
    ean: this.ean,
    lot: this.lot,
    sscc: this.sscc,
    caducitat: this.caducitat,
    client: this.client,
    producte: this.producte
  });
  }

  ngOnChanges(){
    if(this.show2==true){

    this.albara_entrada.setValue(this.num_entrada.value);

    this.palet ={
      albara_entrada: this.num_entrada.value,
      data_entrada: '',
      lot: '',
      product_id: NaN,
      client_id: NaN,
      sscc: '',
      caducitat: new Date,
      albara_sortida: '',
      data_sortida: '',
      location_id: NaN     
    }

      this.store.dispatch(contador({palet: this.palet}));

    }
  }  
  
  interpreteBarcode(){
    "use strict";

    try{

      let answer= parseBarcode(this.codi());

      return answer.parsedCodeItems.forEach(this.basedades, this);
      
    } catch (e){
      console.log(e);
  }
  }

  basedades(element: any, index: any,array: any){
    const ai=element.ai;
    let data=element.data;

    if(ai=='10'){
      this.lot.setValue(data);
    } else if ((ai=='01') || (ai=='02')){
      this.ean.setValue(data);
      this.getProduct();
    } else if (ai=='02'){
      this.ean.setValue(data);
      this.getProduct();
    } else if (ai=='00'){
      this.sscc.setValue(data);
    } else if (ai=='15'){
      data=data.toLocaleDateString();
      data=data.split("/").reverse().join("-");
      this.caducitat.setValue(data);
    } 
  }  

  codi(){
    if(this.barcode2.value != ''){
      return this.barcode2.value;
    } else if (this.barcode.value != ''){
      return this.barcode.value;
    }
  }

  getProduct(){  

  this.store.dispatch(getId({ean: this.ean.value}));   

  }
  
  goSave(){

    this.producte.setValue(this.productState$.producte?.product_id);
    this.client.setValue(this.productState$.producte?.client_id);

    const form= this.entradaForm.value;
        
        this.palet={
          albara_entrada: this.num_entrada.value,
          data_entrada: this.currDate,
          lot: form.lot,
          product_id: form.producte,
          client_id: form.client,
          sscc: form.sscc,
          caducitat: form.caducitat,
          albara_sortida: '',
          data_sortida: '',
          location_id: this.location_id.value     
        }

    this.store.dispatch(createPalet({ palet: this.palet }));
    
    this.entradaForm.reset();
    this.bSubmitted = false;
    this.albara_entrada.setValue(this.num_entrada.value);  
 }  

 public buildForm(){

  this.bSubmitted = true;

  this.currDate= this.dp.transform( new Date(), 'yyyy-MM-dd');  

  this.goSave(); 
}

goOut(){

  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate(['/entrada']);
});

} 

}
