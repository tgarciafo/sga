import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../../../clients/actions';
import { ClientState } from '../../../../clients/reducers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { consultaSsccProduct, paletReset } from 'src/app/palets/actions';
import { PaletState } from 'src/app/palets/reducers';
import { ProducteState } from 'src/app/productes/reducers';
import { getClientProducte } from 'src/app/productes/actions';
import * as XLSX from 'xlsx';
import { UserState } from 'src/app/user/reducers';

@Component({
  selector: 'app-consulta-sscc-producte',
  templateUrl: './consulta-sscc-producte.component.html',
  styleUrls: ['./consulta-sscc-producte.component.css']
})
export class ConsultaSsccProducteComponent implements OnInit {

 public data: FormControl;
 public caducitat: FormControl;
 public client_id: FormControl;
 public product_id: FormControl;
 public consultaSsccProductForm: FormGroup;
 public errorConsulta: any;
 public bSubmitted: boolean;

  clientState$: ClientState;
  productState$: ProducteState;
  paletState$: PaletState;
  userState$: UserState;
  userType: string | undefined;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
    this.store.select('userApp').subscribe(user => {
      this.userType = user.user?.type;
      this.userState$ = user
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.bSubmitted = false;
    this.store.dispatch(paletReset());

    if(this.userType == 'Client'){    
      this.client_id = new FormControl(this.userState$.user?.client_id, [Validators.required]);
      this.onChangeClientValue();
    } else {
        this.client_id = new FormControl('', [Validators.required]);
    }

    this.data = new FormControl('', [Validators.required]);
    this.caducitat = new FormControl('0000-00-00', []);
    this.product_id = new FormControl('', [Validators.required]);
    this.errorConsulta = '';

    this.consultaSsccProductForm = this.formBuilder.group({
      data: this.data,
      caducitat: this.caducitat,
      client_id: this.client_id,
      product_id: this.product_id
    });  
    
  }

  onChangeClientValue(){
    this.store.dispatch(getClientProducte({client_id: this.client_id.value}));
  }

  getConsultaSsccProduct(){

    this.bSubmitted = true;

    this.store.dispatch(consultaSsccProduct({product_id: this.product_id.value, data: this.data.value, caducitat:this.caducitat.value}));
    
    this.consultaSsccProductForm.reset();

    if(this.userType == 'Client'){    
      this.client_id.setValue(this.userState$.user?.client_id);
    }
    
    this.caducitat.setValue('0000-00-00');

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
