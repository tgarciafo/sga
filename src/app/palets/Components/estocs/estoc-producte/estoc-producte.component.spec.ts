import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { EstocProducteComponent } from './estoc-producte.component';

describe('EstocProducteComponent', () => {
  let component: EstocProducteComponent;
  let fixture: ComponentFixture<EstocProducteComponent>;

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
      declarations: [ EstocProducteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstocProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    
    const form = component.estocProductForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {

    const form = component.estocProductForm;
    const client_id = component.estocProductForm.controls['client_id'];
    const product_id = component.estocProductForm.controls['product_id'];
    const data = component.estocProductForm.controls['data'];
    product_id.setValue('5');
    client_id.setValue('1');
    data.setValue('20211101');

    expect(form.invalid).toBeFalse();
  }); 
});
