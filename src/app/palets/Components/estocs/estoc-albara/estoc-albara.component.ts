import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaletState } from 'src/app/palets/reducers';
import { estocAlbara, paletReset } from 'src/app/palets/actions';
import * as XLSX from 'xlsx';
import { UserState } from 'src/app/user/reducers';

@Component({
  selector: 'app-estoc-albara',
  templateUrl: './estoc-albara.component.html',
  styleUrls: ['./estoc-albara.component.css']
})
export class EstocAlbaraComponent implements OnInit {

 public num_albara: FormControl;
 public estocAlbaraForm: FormGroup;
 public errorConsulta: any;
 public bSubmitted: boolean;

 sum: number;

 albaraTitle: Date;

  paletState$: PaletState;
  userState$: UserState;
  userType: string | undefined;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
    this.store.select('userApp').subscribe(user => {
      this.userType = user.user?.type;
      this.userState$ = user
    });
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.store.dispatch(paletReset());
    this.num_albara = new FormControl('', [Validators.required]);
    this.errorConsulta = '';

    this.estocAlbaraForm = this.formBuilder.group({
      num_albara: this.num_albara,
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

  getEstocAlbara(){

    this.bSubmitted = true;

    if(this.userType == 'Client'){    
    this.store.dispatch(estocAlbara({ num_albara: this.num_albara.value, client_id: this.userState$.user?.client_id}));
    } else {
      this.store.dispatch(estocAlbara({ num_albara: this.num_albara.value, client_id: 0}));
    }
    
    this.albaraTitle = this.num_albara.value;

    this.estocAlbaraForm.reset();

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
