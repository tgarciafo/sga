import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Palet } from '../../../models/palet';
import {DatePipe} from '@angular/common';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { ProducteState } from 'src/app/productes/reducers';
import { PaletState } from 'src/app/palets/reducers';
import {createPalet} from '../../../actions';
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
  @ViewChild('qty', {static: false}) qty: ElementRef;

  @ViewChild("barcode") barcode: ElementRef;
  @ViewChild("barcode2") barcode2: ElementRef;
  
  count: number = 0;
  
  currDate: string | null = '';

  public num_ean: number;

  public palet: Palet;

  public product_id: number;
  public client_id: number;

  @Input() num_entrada: any = '';
  @Input() location_id: any = NaN;
  @Input() show: boolean= true;
  @Input() show2: boolean= false;   

  constructor(private store: Store<AppState>, private dp:DatePipe, ean: ElementRef, lot: ElementRef, sscc:ElementRef, caducitat: ElementRef, barcode: ElementRef, barcode2: ElementRef) { 
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);

    this.ean=ean;
    this.lot=lot;
    this.caducitat=caducitat;
    this.sscc=sscc;
    this.barcode = barcode;
    this.barcode2 = barcode2; 
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProductes());
    this.store.dispatch(getAllClients());
  }

  public buildForm(){
    this.currDate= this.dp.transform( new Date(), 'yyyy-MM-dd');

    this.getProduct(); 

    this.goSave(); 
  }

  ngOnChanges(){
    if(this.show2==true){
/*       this.getCount(this.num_entrada);
 */     
      }
  }  

  goOut(){
    return window.location.reload();
  }

  /* getCount(albara:string){
    this.paletsService.contador(albara).subscribe((data: any)=>{
      this.count=data;
      this.barcode.nativeElement.focus();

    }, ()=>{
      alert('Hi ha hagut un error');
    });

  } */

  submitForm() {
    let selectButton = document.getElementById('sendbutton');

    if(selectButton){
    selectButton.click();
    this.barcode2.nativeElement.focus();
    }
  }

  submitForm2() {
    let selectButton = document.getElementById('sendbutton');
    if(selectButton){
    selectButton.click();
    }
    
    var submit = document.getElementById('submitbutton');
    if(submit){
    submit.click();
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
    
    lot.value=" ";
    ean.value=" ";
    sscc.value=" ";
    caducitat.value=" ";    
    
  }

  getProduct(){  

  this.num_ean=this.ean.nativeElement.value;

  this.store.dispatch(getId({ean: this.num_ean}));   

  }
  
  goSave(){

    this.product_id= this.productState$.producte?.product_id;
    this.client_id= this.productState$.producte?.client_id;
        
        this.palet={
          albara_entrada: this.num_entrada.value,
          data_entrada: this.currDate,
          lot: this.lot.nativeElement.value,
          product_id: this.product_id,
          client_id: this.client_id,
          sscc: this.sscc.nativeElement.value,
          caducitat: this.caducitat.nativeElement.value,
          albara_sortida: null,
          data_sortida: null,
          location_id: this.location_id.value     
        }

    this.store.dispatch(createPalet({ palet: this.palet }));
    this.clear();
/*     this.getCount(this.num_entrada);    
 */  } 

}
