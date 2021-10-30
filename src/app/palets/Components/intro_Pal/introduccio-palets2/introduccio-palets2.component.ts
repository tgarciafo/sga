import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Palet } from '../../../models/palet';
import {DatePipe} from '@angular/common';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { ProducteState } from 'src/app/productes/reducers';
import { PaletState } from 'src/app/palets/reducers';
import {createPalet, contador} from '../../../actions';
import { getAllProductes, getId } from '../../../../productes/actions';
import { getAllClients } from 'src/app/clients/actions';

@Component({
  selector: 'app-introduccio-palets2',
  templateUrl: './introduccio-palets2.component.html',
  styleUrls: ['./introduccio-palets2.component.css']
})

export class IntroduccioPalets2Component implements OnInit {

  productState$: ProducteState;
  paletState$: PaletState;

  @ViewChild('ean', {static: false}) ean: ElementRef;
  @ViewChild('lot', {static: false}) lot: ElementRef;
  @ViewChild('caducitat', {static: false}) caducitat: ElementRef;
  @ViewChild('sscc', {static: false}) sscc: ElementRef;
  @ViewChild('client', {static: false}) client: ElementRef;
  @ViewChild('producte', {static: false}) producte: ElementRef;


  @ViewChild("barcode") barcode: ElementRef;
  @ViewChild("barcode2") barcode2: ElementRef;
    
  currDate: string | null = '';

  public num_ean: number;

  @Input() num_entrada: any = '';
  @Input() location_id: any = NaN;
  @Input() show: boolean= true;
  @Input() show2: boolean= false;   

  public palet: Palet;

  constructor(private store: Store<AppState>, private dp:DatePipe, ean: ElementRef, lot: ElementRef, sscc:ElementRef, caducitat: ElementRef, barcode: ElementRef, barcode2: ElementRef, client: ElementRef, producte: ElementRef) { 
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);

    this.ean=ean;
    this.lot=lot;
    this.caducitat=caducitat;
    this.sscc=sscc;
    this.client=client;
    this.producte=producte;
    this.barcode = barcode;
    this.barcode2 = barcode2; 
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProductes());
    this.store.dispatch(getAllClients());
  }

  public buildForm(){
    this.currDate= this.dp.transform( new Date(), 'yyyy-MM-dd');  

    this.goSave(); 
  }

  ngOnChanges(){
    if(this.show2==true){
      this.barcode.nativeElement.focus();
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
      console.log(this.palet);
      this.store.dispatch(contador({palet: this.palet}));
    }
  }  

  goOut(){
    return window.location.reload();
  }

  submitForm() {
    let selectButton = document.getElementById('sendbutton');

    if(selectButton){
    selectButton.click();
    this.getProduct(); 
    this.barcode2.nativeElement.focus();
    }
  }

  submitForm2() {
    let selectButton = document.getElementById('sendbutton');
    if(selectButton){
    selectButton.click();
    this.getProduct(); 
    }
    
    var submit = document.getElementById('submitbutton');
    if(submit){
    submit.click();
    this.getProduct(); 
    }
  }

  clear() {

    let barcode=<HTMLInputElement>document.getElementById('barcode');

    if(barcode){
      barcode.value="";
    }

    let barcode2=<HTMLInputElement>document.getElementById('barcode2');

    if(barcode2){
      barcode2.value="";
    }

    

    let lot=<HTMLInputElement>document.getElementById('lot');
    let ean=<HTMLInputElement>document.getElementById('ean');
    let sscc=<HTMLInputElement>document.getElementById('sscc');
    let caducitat=<HTMLInputElement>document.getElementById('caducitat');
    let client=<HTMLInputElement>document.getElementById('client');
    let producte=<HTMLInputElement>document.getElementById('producte');
    
    lot.value=" ";
    ean.value=" ";
    sscc.value=" ";
    caducitat.value=" ";    
    client.value=" ";
    producte.value=" ";
    
  }

  getProduct(){  

  this.num_ean=this.ean.nativeElement.value;

  this.store.dispatch(getId({ean: this.num_ean}));   

  }
  
  goSave(){
        
        this.palet={
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
        }

    this.store.dispatch(createPalet({ palet: this.palet }));
    
    this.clear();
/*     this.store.dispatch(contador({albara_entrada: this.num_entrada.value}));
 */    this.barcode.nativeElement.focus(); 
 } 

}
