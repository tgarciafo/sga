import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { consultaEntrades, consultaPalEntrades, paletReset } from '../../actions';
import { PaletState } from 'src/app/palets/reducers';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { UserState } from 'src/app/user/reducers';

@Component({
  selector: 'app-consulta-entrades',
  templateUrl: './consulta-entrades.component.html',
  styleUrls: ['./consulta-entrades.component.css']
})
export class ConsultaEntradesComponent implements OnInit {

 public data: FormControl;
 public data2: FormControl;
 public consultaEntForm: FormGroup;
 public errorConsulta: any;
 public bSubmitted: boolean;

 closeResult: string = '';

 paletState$: PaletState;
 userState$: UserState;
 userType: string | undefined;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private modalService: NgbModal) { 
    this.store.select('paletApp').subscribe(consulta => this.paletState$ = consulta);
    this.store.select('userApp').subscribe(user => {
      this.userType = user.user?.type;
      this.userState$ = user
    });
  }

  ngOnInit(): void {
    this.bSubmitted = false;
    this.store.dispatch(paletReset());
    this.data = new FormControl('', [Validators.required]);
    this.data2 = new FormControl('', [Validators.required]);
    this.errorConsulta = '';

    this.consultaEntForm = this.formBuilder.group({
      data: this.data,
      data2: this.data2
    });
  }

  getEntrades(){

    this.bSubmitted = true;

    if(this.userType == 'Client'){    
      this.store.dispatch(consultaEntrades({data: this.data.value, data2: this.data2.value, client_id: this.userState$.user?.client_id}));
    } else {
      this.store.dispatch(consultaEntrades({data: this.data.value, data2: this.data2.value, client_id: 0}));
    }

    return this.consultaEntForm.reset();

  }

  open(content:any, albara_entrada: string) {
    this.store.dispatch(consultaPalEntrades({albara: albara_entrada}));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /*name of the excel-file which will be downloaded. */ 
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
