import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { UserState } from '../../reducers';
import { deleteUser, editUser, getAllUsers } from '../../actions';
import { faEye, faEyeSlash, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientState } from 'src/app/clients/reducers';
import { getAllClients } from 'src/app/clients/actions';
import { checkWord } from 'src/app/Shared/Directives/check-word.validator';
import { checkEquality } from 'src/app/Shared/Directives/check-equality.validator';
import { User } from '../../models/user';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  userState$: UserState;
  clientState$: ClientState;

  public user_id: FormControl;
  public name: FormControl;
  public password: FormControl;
  public email: FormControl;
  public type: FormControl;
  public client_id: FormControl;
  public repeat_password: FormControl;
  public editForm: FormGroup;
  public bSubmitted: boolean;

  isActive: boolean = true;
  isActive2: boolean = true;

  closeResult: string = '';
                                                          
  constructor( private formBuilder: FormBuilder, private store: Store<AppState>, private modalService: NgbModal ) { 
    this.store.select('userApp').subscribe(users => this.userState$ = users);
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(getAllUsers());

    this.bSubmitted = false;
    this.user_id = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9]*$')]);
    this.email = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$')]);
    this.type = new FormControl('', [Validators.required, checkWord(/ /)]);
    this.client_id = new FormControl('', [checkWord(/ /)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.repeat_password = new FormControl('', [Validators.required, Validators.minLength(8)])

    this.editForm = this.formBuilder.group({
      user_id: this.user_id,
      name: this.name,
      email: this.email,
      type: this.type,
      client_id: this.client_id,
      password: this.password,
      repeat_password: this.repeat_password
    }, {
      validators: checkEquality
    });
  }

  validatorEquality(): boolean | undefined{
    return this.editForm.hasError('equals') && this.editForm.get('password')?.dirty
      && this.editForm.get('repeat_password')?.dirty;
  }

  eliminar(user: any){

    if(confirm("Segur que vols eliminar el registre?")){

    const id = user.user_id;

    this.store.dispatch(deleteUser({id: id}));

    }

  }

  /* Modal */

  open(content:any, user: User) {
    this.user_id.setValue(user.user_id);
    this.name.setValue(user.name);
    this.email.setValue(user.email);
    this.password.setValue(user.password);
    this.repeat_password.setValue(user.password);
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

  show(){
    if (this.isActive == true){
    return this.isActive = false;
    } else {
      return this.isActive = true;
    }
  }

  show2(){
    if (this.isActive2 == true){
    return this.isActive2 = false;
    } else {
      return this.isActive2 = true;
    }
  }

  editar(){

    const form = this.editForm.value as User;

    this.bSubmitted = true;

    this.store.dispatch(editUser({ id: form.user_id, user:form }));

    return this.editForm.reset();

  }

}
