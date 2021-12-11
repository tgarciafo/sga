import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { deleteClient, editClient, getAllClients } from '../../actions';
import { ClientState } from '../../reducers';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../models/client';
import { LoginState } from 'src/app/login/reducers';
import { UserState } from 'src/app/user/reducers';

@Component({
  selector: 'app-clients-registrats',
  templateUrl: './clients-registrats.component.html',
  styleUrls: ['./clients-registrats.component.css']
})
export class ClientsRegistratsComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  clientState$: ClientState;
  loginState$: LoginState;
  userState$: UserState;
  userType: string | undefined;

  public client_id: FormControl;
  public client_code: FormControl;
  public description_client: FormControl;
  public editForm: FormGroup;
  public bSubmitted: boolean;

  alertMsg: string;
      
  isAlert: boolean = false;

  closeResult: string = '';

  constructor(private formBuilder: FormBuilder,private store: Store<AppState>, private webSocketService: WebSocketService, private modalService: NgbModal) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('loginApp').subscribe(login => this.loginState$ = login);
    this.store.select('userApp').subscribe(user => {
      this.userType = user.user?.type;
      this.userState$ = user
    });
    this.webSocketService.clientEven.subscribe(res => {
      this.store.dispatch(getAllClients());
      this.isAlert = true;
      this.alertMsg = res.alert;
    })
  }

  close(){
    this.isAlert = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.bSubmitted = false;
    this.client_code = new FormControl('', [Validators.required]);
    this.description_client = new FormControl('', [Validators.required]);
    this.client_id = new FormControl('', [Validators.required]);

    this.editForm = this.formBuilder.group({
      client_code: this.client_code,
      description_client: this.description_client,
      client_id: this.client_id
    });
  }

  public editar(){

    const form = this.editForm.value as Client;

    this.bSubmitted = true;

    this.store.dispatch(editClient({ id: form.client_id, client: form  }));
   
    this.editForm.reset();

    const alert = "S'ha editat un client";

    this.webSocketService.clientEvent({alert});

  }

  eliminar(client: any){

    const id = client.client_id;

    this.store.dispatch(deleteClient({id: id}));

    const alert = "S'ha eliminat un client";

    this.webSocketService.clientEvent({alert});

  }

  /* Modal */

  open(content:any, client: Client) {
    this.client_id.setValue(client.client_id);
    this.client_code.setValue(client.client_code);
    this.description_client.setValue(client.description_client);
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
