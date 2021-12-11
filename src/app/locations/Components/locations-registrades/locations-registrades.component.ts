import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { deleteLocation, editLocation, getAllLocations } from '../../actions';
import { LocationState } from '../../reducers';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../../models/location';
import { LoginState } from 'src/app/login/reducers';
import { UserState } from 'src/app/user/reducers';

@Component({
  selector: 'app-locations-registrades',
  templateUrl: './locations-registrades.component.html',
  styleUrls: ['./locations-registrades.component.css']
})
export class LocationsRegistradesComponent implements OnInit {

  locationState$: LocationState;
  loginState$: LoginState;
  userState$: UserState;
  userType: string | undefined;

  alertMsg: string;
      
  isAlert: boolean = false;

  public location_description: FormControl;
  public location_id: FormControl;
  public editForm: FormGroup;
  public bSubmitted: boolean;

  closeResult: string = '';

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  constructor(private store: Store<AppState>, private webSocketService: WebSocketService, private formBuilder: FormBuilder, private modalService: NgbModal) { 
    this.store.select('locationApp').subscribe(locations => this.locationState$ = locations);
    this.store.select('loginApp').subscribe(login => this.loginState$ = login);
    this.store.select('userApp').subscribe(user => {
      this.userType = user.user?.type;
      this.userState$ = user
    });
    this.webSocketService.locationEven.subscribe(res => {
      this.store.dispatch(getAllLocations());
      this.isAlert = true;
      this.alertMsg = res.alert;
    })
  }

  close(){
    this.isAlert = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllLocations());

    this.bSubmitted = false;
    this.location_description = new FormControl('', [Validators.required]);
    this.location_id = new FormControl('', [Validators.required]);

    this.editForm = this.formBuilder.group({
      location_description: this.location_description,
      location_id: this.location_id
    });
  }

  public editar(){

    const form = this.editForm.value as Location;

    this.bSubmitted = true;

    this.store.dispatch(editLocation({ id: form.location_id, location: form  }));
   
    this.editForm.reset();

    const alert = "S'ha editat una ubicació";

    this.webSocketService.locationEvent({alert});

  }

  eliminar(location: any){

    const id = location.location_id;

    this.store.dispatch(deleteLocation({id: id}));

    const alert = "S'ha eliminat una ubicació";

    this.webSocketService.locationEvent({alert});

  }

  /* Modal */

  open(content:any, location: Location) {
    this.location_id.setValue(location.location_id);
    this.location_description.setValue(location.location_description);
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
