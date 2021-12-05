declare var parseBarcode: any;
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaletState } from 'src/app/palets/reducers';
import { consultaSSCC } from 'src/app/palets/actions';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-consulta-sscc',
  templateUrl: './consulta-sscc.component.html',
  styleUrls: ['./consulta-sscc.component.css']
})
export class ConsultaSsccComponent implements OnInit {

 public num_sscc: FormControl;
 public consultaSSCCForm: FormGroup;
 public errorConsulta: any;
 public bSubmitted: boolean;

 ssccTitle: Date;

  paletState$: PaletState;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.num_sscc = new FormControl('', [Validators.required]);
    this.errorConsulta = '';

    this.consultaSSCCForm = this.formBuilder.group({
      num_sscc: this.num_sscc,
    });  

    this.store.dispatch(consultaSSCC({ num_sscc: '0'}));
    
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
      this.num_sscc.setValue(data);
    } 
  }  

  codi(){
    if (this.num_sscc.value != ''){
      return this.num_sscc.value;
    }
  }  

  getConsultaSSCC(){

    this.bSubmitted = true;

    this.store.dispatch(consultaSSCC({ num_sscc: this.num_sscc.value}));
    
    this.ssccTitle = this.num_sscc.value;

    this.consultaSSCCForm.reset();

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
