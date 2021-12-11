import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

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
      declarations: [ SignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    const form = component.regUserForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {
    const form = component.regUserForm;
    const name = component.regUserForm.controls['name'];
    const email = component.regUserForm.controls['email'];
    const password = component.regUserForm.controls['password'];
    const type = component.regUserForm.controls['type'];
    const repeat_password = component.regUserForm.controls['repeat_password'];
    repeat_password.setValue('12345678');
    type.setValue('Admin');
    name.setValue('Tania');
    email.setValue('tgarciafo@uoc.edu');
    password.setValue('12345678');

    expect(form.invalid).toBeFalse();
  });  
});
