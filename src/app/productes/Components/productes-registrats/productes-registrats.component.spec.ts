import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { ProductesRegistratsComponent } from './productes-registrats.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductesRegistratsComponent', () => {
  let component: ProductesRegistratsComponent;
  let fixture: ComponentFixture<ProductesRegistratsComponent>;

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
      declarations: [ ProductesRegistratsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductesRegistratsComponent);
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
    const product_id = component.editForm.controls['product_id'];
    const client_id = component.editForm.controls['client_id'];
    const ean = component.editForm.controls['ean'];
    const reference = component.editForm.controls['reference'];
    const description_prod = component.editForm.controls['description_prod'];
    const quantity = component.editForm.controls['quantity'];
    product_id.setValue('12');
    quantity.setValue('45');
    description_prod.setValue('2L Pack 3x2');
    reference.setValue('30014157');
    ean.setValue('8574515443');
    client_id.setValue('1');

    expect(form.invalid).toBeFalse();
  });  
});
