import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createUser } from '../../actions';
import { User } from '../../models/user';
import { ClientState } from '../../../clients/reducers';
import { getAllClients } from 'src/app/clients/actions';
import { checkWord } from '../../../Shared/Directives/check-word.validator';
import { checkEquality } from 'src/app/Shared/Directives/check-equality.validator';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { UserState } from '../../reducers';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  public user: User;

  clientState$: ClientState;
  userState$: UserState;

  isActive: boolean = true;
  isActive2: boolean = true;

  public name: FormControl;
  public password: FormControl;
  public email: FormControl;
  public type: FormControl;
  public client_id: FormControl;
  public repeat_password: FormControl;
  public regUserForm: FormGroup;
  public bSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('clientApp').subscribe(clients => this.clientState$ = clients);
    this.store.select('userApp').subscribe(users => this.userState$ = users);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClients())

    this.bSubmitted = false;
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9 ]*$')]);
    this.email = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$')]);
    this.type = new FormControl('', [Validators.required, checkWord(/ /)]);
    this.client_id = new FormControl('', [checkWord(/ /)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.repeat_password = new FormControl('', [Validators.required, Validators.minLength(8)])

    this.regUserForm = this.formBuilder.group({
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

  public saveUser(){
    
    const form = this.regUserForm.value as User;

    this.bSubmitted = true;

    this.store.dispatch(createUser({ user:form }));

    return this.regUserForm.reset();

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

  validatorEquality(): boolean | undefined{
    return this.regUserForm.hasError('equals') && this.regUserForm.get('password')?.dirty
      && this.regUserForm.get('repeat_password')?.dirty;
  }

}
