import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import {MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../reducers';
import { login } from '../../actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        StoreModule.forRoot( appReducers, {
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false,
          },
        }),
        AppRoutingModule,
        HttpClientModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    const form = component.loginForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {
    const form = component.loginForm;
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];
    email.setValue('tgarciafo@uoc.edu');
    password.setValue('1234');

    expect(form.invalid).toBeFalse();
  });  

  it("Ha de mostrar la icona de l'ull com a obert", () => {
    component.isActive = false;  

    fixture.detectChanges();
    component.show();
    
    expect(component.isActive).toBeTrue();
  });

  it("Ha de mostrar la icona de l'ull com a tancat", () => {
    component.isActive = true;  

    fixture.detectChanges();
    component.show();
    
    expect(component.isActive).toBeFalse();
  });

  it("Emetre bSubmitted false a l'inici", () => {
    
    component.ngOnInit();
    
    expect(component.bSubmitted).toBeFalse();
  });

  it("Mètode checkLogin()", () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
    component.checkLogin();

    component.email.setValue('tgarciafo@uoc.edu');
    component.password.setValue('1234');
    
    const credentials = {
      email: component.email.value,
      password: component.password.value
    }

    expect(dispatchSpy).toHaveBeenCalledWith(login({credentials}));
    expect(component.bSubmitted).toBeTrue();
  });
});
