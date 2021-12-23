import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { deleteProducte, editProducte, getAllProductes } from '../../actions';
import { ProducteState } from '../../reducers';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ClientState } from 'src/app/clients/reducers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { checkWord } from 'src/app/Shared/Directives/check-word.validator';
import { Producte } from '../../models/producte';
import { LoginState } from 'src/app/login/reducers';
import { UserState } from 'src/app/user/reducers';
import { getAllClients } from 'src/app/clients/actions';

@Component({
  selector: 'app-productes-registrats',
  templateUrl: './productes-registrats.component.html',
  styleUrls: ['./productes-registrats.component.css']
})
export class ProductesRegistratsComponent implements OnInit {
  
  clientState$: ClientState;
  productState$: ProducteState;
  loginState$: LoginState;
  userState$: UserState;
  userType: string | undefined;

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  alertMsg: string;
      
  isAlert: boolean = false;

  closeResult: string = '';

  public product_id: FormControl;
  public client_id: FormControl;
  public ean: FormControl;
  public reference: FormControl;
  public description_prod: FormControl;
  public quantity: FormControl;
  public editForm: FormGroup;
  public bSubmitted: boolean;

  constructor(private store: Store<AppState>, private webSocketService: WebSocketService, private formBuilder: FormBuilder, private modalService: NgbModal) { 
    this.store.select('producteApp').subscribe(products => this.productState$ = products);
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('loginApp').subscribe(login => this.loginState$ = login);
    this.store.select('userApp').subscribe(user => {
      this.userType = user.user?.type;
      this.userState$ = user
    });
    this.webSocketService.producteEven.subscribe(res => {
      this.store.dispatch(getAllProductes());
      this.isAlert = true;
      this.alertMsg = res.alert;
    })
  }

  close(){
    this.isAlert = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProductes());
    this.store.dispatch(getAllClients());
    this.bSubmitted = false;
    this.product_id = new FormControl('', [Validators.required]);
    this.client_id = new FormControl('', [checkWord(/ /), Validators.required]);
    this.ean = new FormControl('', [Validators.required]);
    this.reference = new FormControl('', [Validators.required]);
    this.description_prod = new FormControl('', [Validators.required]);
    this.quantity = new FormControl('', [Validators.required]);

    this.editForm = this.formBuilder.group({
      product_id: this.product_id,
      client_id: this.client_id,
      ean: this.ean,
      reference: this.reference,
      description_prod: this.description_prod,
      quantity: this.quantity
    });
  }

  public editar(){

    const form = this.editForm.value as Producte;

    this.bSubmitted = true;

    this.store.dispatch(editProducte({ id: form.product_id, producte: form  }));
   
    this.editForm.reset();

    const alert = "S'ha editat un producte";

    this.webSocketService.producteEvent({alert});

  }

  eliminar(product: any){

    if(confirm("Segur que vols eliminar el registre?")){

    const id = product.product_id;

    this.store.dispatch(deleteProducte({id: id}));

    const alert = "S'ha eliminat un producte";

    this.webSocketService.producteEvent({alert});

    }

  }

  /* Modal */

  open(content:any, product: Producte) {
    this.product_id.setValue(product.product_id);
    this.client_id.setValue(product.client_id);
    this.ean.setValue(product.ean);
    this.reference.setValue(product.reference);
    this.description_prod.setValue(product.description_prod);
    this.quantity.setValue(product.quantity);
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

}
