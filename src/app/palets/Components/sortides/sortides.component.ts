declare var parseBarcode: any;
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PlanificationState } from 'src/app/planification/reducers';
import { PaletState } from '../../reducers';
import { Sortida } from '../../models/sortida';
import { sortida } from '../../actions';
import { getPlanificationSortida } from 'src/app/planification/actions';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';

@Component({
  selector: 'app-sortides',
  templateUrl: './sortides.component.html',
  styleUrls: ['./sortides.component.css']
})
export class SortidesComponent implements OnInit {

  /* Formulari 1 */

  public num_sortida: FormControl;
  public sortidaForm: FormGroup;
  public bSubmitted: boolean;

  /* Fi Formulari 1 */

  /* Formulari 2 */

  public albara_sortida: FormControl;
  public barcode: FormControl;
  public sscc: FormControl;
  public sortidaForm2: FormGroup;
  public bSubmitted2: boolean;

  /* Fi Formulari 2 */

  planificationState$: PlanificationState;
  paletState$: PaletState;

  alertMsg: string;
      
  isAlert: boolean = false;

  data_sortida = new Date();
  sortida: Sortida;

  focus = true;
  focusEvent= new EventEmitter<boolean>();

  constructor(private datePipe: DatePipe, private webSocketService: WebSocketService, private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.store.select('planificationApp').subscribe(planifications => this.planificationState$ = planifications);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
    this.webSocketService.sortidaEven.subscribe(res => {
      if (this.albara_sortida.value == res.albara){
        this.store.dispatch(getPlanificationSortida({albara_sortida:this.albara_sortida.value}));
        this.isAlert = true;
        this.alertMsg = res.alerta;
      }
    })
  }

  ngOnInit(): void {

    this.bSubmitted = false;

    /* Formulari 1 */

    this.num_sortida = new FormControl('', [Validators.required]);

    this.sortidaForm = this.formBuilder.group({
      num_sortida: this.num_sortida,
    });

    /* Formulari 1 */

    /* Formulari 2 */

    this.albara_sortida = new FormControl('', [Validators.required]);
    this.barcode = new FormControl('', [Validators.required]);
    this.sscc = new FormControl('', [Validators.required]);

    this.sortidaForm2 = this.formBuilder.group({
      albara_sortida: this.albara_sortida,
      barcode: this.barcode,
      sscc: this.sscc
    });

    /* Formulari 2 */

  }

  close(){
    this.isAlert = false;
  }

  setFocus(){
    return this.focusEvent.emit(true);
  }

  interpreteBarcode(){
    "use strict";

    try{

      let answer= parseBarcode(this.codi());

      answer.parsedCodeItems.forEach(this.basedades, this);

      return this.saveSortida();

    } catch (e){
      console.log(e);
  }
    
  }

  basedades(element: any, index: any,array: any){
    const ai=element.ai;
    let data=element.data;

    if (ai=='00'){
      this.sscc.setValue(data);
    } 
  }  

  codi(){
    if (this.barcode.value != ''){
      return this.barcode.value;
    }
  }

  getSortida(){
    this.bSubmitted = true;
    this.bSubmitted2 = false;

    this.albara_sortida.setValue(this.num_sortida.value);

    this.store.dispatch(getPlanificationSortida({albara_sortida:this.albara_sortida.value}));
    this.setFocus();
  }

  saveSortida(){

    this.bSubmitted2 = true;

    const form = this.sortidaForm2.value;

    this.sortida={
      albara_sortida: form.albara_sortida,
      sscc: form.sscc,
      data_sortida: this.datePipe.transform(this.data_sortida, 'yyyy-MM-dd'),
      product_id: this.planificationState$.planifications[0].product_id
    }
  
    this.store.dispatch(sortida({sortida: this.sortida}));

    this.sortidaForm2.reset();

    this.albara_sortida.setValue(this.num_sortida.value);

    this.setFocus();

    const alert = 'Nou palet llegit';

    this.webSocketService.sortidaEvent({alerta: alert, albara: this.num_sortida.value});

  } 

  goOut(){
    this.bSubmitted = false;
    this.sortidaForm.reset();
    this.sortidaForm2.reset();
  } 

}


