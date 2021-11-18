import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../../../clients/actions';
import { ClientState } from '../../../../clients/reducers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { estocUbicacio } from 'src/app/palets/actions';
import { PaletState } from 'src/app/palets/reducers';
import { LocationState } from 'src/app/locations/reducers';
import { getAllLocations } from 'src/app/locations/actions';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-estoc-ubicacio',
  templateUrl: './estoc-ubicacio.component.html',
  styleUrls: ['./estoc-ubicacio.component.css']
})
export class EstocUbicacioComponent implements OnInit {

 public data: FormControl;
 public client_id: FormControl;
 public location_id: FormControl;
 public estocUbicacioForm: FormGroup;
 public errorConsulta: any;
 public bSubmitted: boolean;

 sum: number;

 dataTitle: Date;

  clientState$: ClientState;
  locationState$: LocationState;
  paletState$: PaletState;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('locationApp').subscribe(locations => this.locationState$ = locations);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(getAllLocations());
    this.bSubmitted = false;
    this.data = new FormControl('', [Validators.required]);
    this.client_id = new FormControl('', [Validators.required]);
    this.location_id = new FormControl('', [Validators.required]);
    this.errorConsulta = '';

    this.estocUbicacioForm = this.formBuilder.group({
      data: this.data,
      client_id: this.client_id,
      location_id: this.location_id
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

  getEstocUbicacio(){

    this.bSubmitted = true;

    this.store.dispatch(estocUbicacio({client_id: this.client_id.value,location_id: this.location_id.value, data: this.data.value}));
    
    this.dataTitle = this.data.value;

    this.estocUbicacioForm.reset();

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
