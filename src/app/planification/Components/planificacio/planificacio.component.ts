import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ClientState } from 'src/app/clients/reducers';
import { ProducteState } from 'src/app/productes/reducers';
import { PlanificationState } from '../../reducers';
import {consultaPalResta} from '../../../palets/actions';
import { getClientProducte } from 'src/app/productes/actions';
import { createPlanification, deletePlanification, getPlanification } from '../../actions';
import { getAllClients } from 'src/app/clients/actions';
import { PaletState } from 'src/app/palets/reducers';
import { UserState } from 'src/app/user/reducers';
import { Planification } from '../../models/planification';
import { DatePipe } from '@angular/common';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';

@Component({
  selector: 'app-planificacio',
  templateUrl: './planificacio.component.html',
  styleUrls: ['./planificacio.component.css']
})
export class PlanificacioComponent implements OnInit {
  
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  /* Formulari 1 */

  public num_sortida: FormControl;
  public idClient: FormControl;
  public planificacioForm: FormGroup;
  public bSubmitted: boolean;

  /* Fi Formulari 1 */

  /* Formulari 2 */

  public albara_sortida: FormControl;
  public product_id: FormControl;
  public palRestants: FormControl;
  public num_palets: FormControl;
  public planificacioForm2: FormGroup;
  public bSubmitted2: boolean;

  /* Fi Formulari 2 */


  clientState$: ClientState;
  productState$: ProducteState;
  planificationState$: PlanificationState;
  paletState$: PaletState;
  userState$: UserState;

  closeResult: string = '';
  data_sortida = new Date();
  planification: Planification;

  paletR: number | null;

  alertMsg: string;
      
  isAlert: boolean = false;

  constructor(private datePipe: DatePipe, private webSocketService: WebSocketService, private formBuilder: FormBuilder, private store: Store<AppState>, private modalService: NgbModal) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('planificationApp').subscribe(planifications => this.planificationState$ = planifications);
    this.store.select('paletApp').subscribe(palets => this.paletState$ = palets);
    this.store.select('userApp').subscribe(user => this.userState$ = user);
    this.webSocketService.planificarEven.subscribe(res => {
      if (res.albara == this.num_sortida.value){
      this.store.dispatch(getPlanification({planification: this.planification}));
      this.isAlert = true;
      this.alertMsg = res.alert;
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());

    this.bSubmitted = false;
    this.num_sortida = new FormControl('', [Validators.required]);
    this.idClient = new FormControl('', [Validators.required]);

    this.planificacioForm = this.formBuilder.group({
      num_sortida: this.num_sortida,
      idClient: this.idClient
    });
  }

  close(){
    this.isAlert = false;
  }

  getPlanification(){
    this.bSubmitted = true;
    this.bSubmitted2 = false;

    this.store.dispatch(getClientProducte({client_id: this.idClient.value}));

    this.albara_sortida = new FormControl(this.num_sortida.value, [Validators.required]);
    this.product_id = new FormControl('', [Validators.required]);
    this.palRestants = new FormControl('', []);
    this.num_palets = new FormControl('', [Validators.required]); 

    this.planificacioForm2 = this.formBuilder.group({
      data_sortida: this.datePipe.transform(this.data_sortida, 'yyyy-MM-dd'),
      sscc: 0,
      albara_sortida: this.albara_sortida,
      product_id: this.product_id,
      user_id: this.userState$.user?.user_id,
      num_palets: this.num_palets
    });

    this.planification ={
      data_sortida: new Date,
      sscc: 0,      
      albara_sortida: this.num_sortida.value,
      product_id: NaN,
      description_prod: '',
      user_id: NaN     
    }

    this.store.dispatch(getPlanification({planification: this.planification}));
    
  }

  goOut(){
    this.bSubmitted = false;
    this.productState$.productes=[];
    this.planificacioForm.reset();
  }

  palResta(product_id: number){
    this.store.dispatch(consultaPalResta({product_id: product_id}));

    this.palRestants.setValue(this.paletState$.palResta);

    return this.num_palets.setValidators([Validators.max(this.palRestants.value), Validators.min(1)]);
    }

  savePlanification(){
    this.bSubmitted2 = true;

    const form = this.planificacioForm2.value;

    for (let i = 0; i < this.num_palets.value; i++) {

    this.store.dispatch(createPlanification({planification:form}));

    }

    this.bSubmitted2 = false;

    this.product_id.setValue('');
    this.palRestants.setValue('');
    this.num_palets.setValue('');

    const alert = 'Palets afegits a la planificaci??';

    this.webSocketService.planificarEvent({alert: alert, albara: this.num_sortida.value});
  }

  /* Modal */

  open(content:any) {
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

  eliminar(planificat: any){

    if(confirm("Segur que vols eliminar el registre?")){

    const albara = planificat.albara_sortida;
    const producte = planificat.product_id;

    this.store.dispatch(deletePlanification({product_id: producte, albara_sortida: albara}));

    const alert2 = 'Palets eliminats a la planificaci??';

    this.webSocketService.planificarEvent({alert: alert2, albara: this.num_sortida.value});
  }

}

}
