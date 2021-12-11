import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { ClientsRegistratsComponent } from './clients-registrats.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('ClientsRegistratsComponent', () => {
  let component: ClientsRegistratsComponent;
  let fixture: ComponentFixture<ClientsRegistratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot( appReducers, {
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false,
          },
        }),
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
      ],
      declarations: [ ClientsRegistratsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsRegistratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    const form = component.editForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {
    const form = component.editForm;
    const client_id = component.editForm.controls['client_id'];
    const client_code = component.editForm.controls['client_code'];
    const description_client = component.editForm.controls['description_client'];
    client_id.setValue('12')
    client_code.setValue('7845784');
    description_client.setValue('Giol');

    expect(form.invalid).toBeFalse();
  });
});
