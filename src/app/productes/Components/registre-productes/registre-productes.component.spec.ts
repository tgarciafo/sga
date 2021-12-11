import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { RegistreProductesComponent } from './registre-productes.component';

describe('RegistreProductesComponent', () => {
  let component: RegistreProductesComponent;
  let fixture: ComponentFixture<RegistreProductesComponent>;

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
      declarations: [ RegistreProductesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreProductesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    const form = component.regProductForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {
    const form = component.regProductForm;
    const client_id = component.regProductForm.controls['client_id'];
    const ean = component.regProductForm.controls['ean'];
    const reference = component.regProductForm.controls['reference'];
    const description_prod = component.regProductForm.controls['description_prod'];
    const quantity = component.regProductForm.controls['quantity'];
    quantity.setValue('45');
    description_prod.setValue('2L Pack 3x2');
    reference.setValue('30014157');
    ean.setValue('8574515443');
    client_id.setValue('1');

    expect(form.invalid).toBeFalse();
  });  
});
