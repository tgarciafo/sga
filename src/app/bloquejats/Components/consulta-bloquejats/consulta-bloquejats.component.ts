import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { consultaPalBloquejats } from '../../actions';
import { BloquejatState } from '../../reducers';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-consulta-bloquejats',
  templateUrl: './consulta-bloquejats.component.html',
  styleUrls: ['./consulta-bloquejats.component.css']
})
export class ConsultaBloquejatsComponent implements OnInit {

  bloquejatState$: BloquejatState;

  constructor(private store: Store<AppState>) {
    this.store.select('bloquejatsApp').subscribe(bloquejats => this.bloquejatState$ = bloquejats);
   }

  ngOnInit(): void {
    this.store.dispatch(consultaPalBloquejats());
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
