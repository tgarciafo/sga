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

@Component({
  selector: 'app-introduccio-palets2',
  templateUrl: './introduccio-palets2.component.html',
  styleUrls: ['./introduccio-palets2.component.css']
})

export class IntroduccioPalets2Component implements OnInit {

  productState$: ProducteState;
  paletState$: PaletState;
    
  currDate: string | null = '';

  public num_ean: number;

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

  constructor(private store: Store<AppState>, private dp:DatePipe, private formBuilder: FormBuilder) { 
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProductes());
    this.store.dispatch(getAllClients());
  }

  

  ngOnChanges(){
    if(this.show2==true){
      this.palet ={
        albara_entrada: this.num_entrada.value,
        data_entrada: '',
        lot: '',
        product_id: NaN,
        client_id: NaN,
        sscc: NaN,
        caducitat: new Date,
        albara_sortida: '',
        data_sortida: '',
        location_id: NaN     
      }

      this.albara_entrada = new FormControl(this.num_entrada.value, [Validators.required]);
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
      lot: this.lot,
      ean: this.ean,
      sscc: this.sscc,
      caducitat: this.caducitat,
      client: this.client,
      producte: this.producte
    });

      this.store.dispatch(contador({palet: this.palet}));
    }
  }  
  

  interpreteBarcode(){
    "use strict";

    try{

      let answer= parseBarcode.parseBarcode(this.codi);

      return answer.parsedCodeItems.forEach(this.basedades);
      

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
    } else if (ai=='02'){
      this.ean.setValue(data);
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

/*   this.num_ean=this.ean.nativeElement.value;
 */
  this.store.dispatch(getId({ean: this.num_ean}));   

  }
  
  goSave(){
        
        /* this.palet={
          albara_entrada: this.num_entrada.value,
          data_entrada: this.currDate,
          lot: this.lot.nativeElement.value,
          product_id: this.producte.nativeElement.value,
          client_id: this.client.nativeElement.value,
          sscc: this.sscc.nativeElement.value,
          caducitat: this.caducitat.nativeElement.value,
          albara_sortida: '',
          data_sortida: '',
          location_id: this.location_id.value     
        } */

    this.store.dispatch(createPalet({ palet: this.palet }));
    
    /* this.clear();
    this.store.dispatch(contador({albara_entrada: this.num_entrada.value}));
    this.barcode.nativeElement.focus(); */
 }  

 public buildForm(){
  this.currDate= this.dp.transform( new Date(), 'yyyy-MM-dd');  

  this.goSave(); 
}

goOut(){
  return window.location.reload();
}


}
