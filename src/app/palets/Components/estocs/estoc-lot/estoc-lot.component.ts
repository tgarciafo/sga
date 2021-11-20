import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../../../clients/actions';
import { ClientState } from '../../../../clients/reducers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { estocLot } from 'src/app/palets/actions';
import { PaletState } from 'src/app/palets/reducers';
import { ProducteState } from 'src/app/productes/reducers';
import { getClientProducte } from 'src/app/productes/actions';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-estoc-lot',
  templateUrl: './estoc-lot.component.html',
  styleUrls: ['./estoc-lot.component.css']
})
export class EstocLotComponent implements OnInit {

 public data: FormControl;
 public client_id: FormControl;
 public product_id: FormControl;
 public estocLotForm: FormGroup;
 public errorConsulta: any;
 public bSubmitted: boolean;

 sum: number;

 dataTitle: Date;

  clientState$: ClientState;
  productState$: ProducteState;
  paletState$: PaletState;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.bSubmitted = false;
    this.data = new FormControl('', [Validators.required]);
    this.client_id = new FormControl('', [Validators.required]);
    this.product_id = new FormControl('', [Validators.required]);
    this.errorConsulta = '';

    this.estocLotForm = this.formBuilder.group({
      data: this.data,
      client_id: this.client_id,
      product_id: this.product_id
    });  
    
  }

 total(state: any){

    this.sum = state.reduce((      
      acc: any,
      obj: any,
     ) => acc + (obj.num_palets),
    0);

    return this.sum;

  }

  onChangeClientValue(){
    this.store.dispatch(getClientProducte({client_id: this.client_id.value}));
  }

  getEstocLot(){

    this.bSubmitted = true;

    this.store.dispatch(estocLot({client_id: this.client_id.value, product_id: this.product_id.value, data: this.data.value}));
    
    this.dataTitle = this.data.value;

    this.estocLotForm.reset();

  }

  fileName= 'consulta.xlsx';  

  exportexcel(): void 
      {
        /* table id is passed over here */   
        let element = document.getElementById('excel-table'); 
        const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
      }

}
