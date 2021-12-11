import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { IntroduccioPalets2Component } from './introduccio-palets2.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

describe('IntroduccioPalets2Component', () => {
  let component: IntroduccioPalets2Component;
  let fixture: ComponentFixture<IntroduccioPalets2Component>;

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
      declarations: [ IntroduccioPalets2Component ],
      providers: [DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduccioPalets2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    const form = component.entradaForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {
    const form = component.entradaForm;
    const albara_entrada = component.entradaForm.controls['albara_entrada'];
    const barcode = component.entradaForm.controls['barcode'];
    const barcode2 = component.entradaForm.controls['barcode2'];
    const lot = component.entradaForm.controls['lot'];
    const qty = component.entradaForm.controls['qty'];
    const ean = component.entradaForm.controls['ean'];
    const sscc = component.entradaForm.controls['sscc'];
    const caducitat = component.entradaForm.controls['caducitat'];
    const client = component.entradaForm.controls['client'];
    const producte = component.entradaForm.controls['producte'];

    albara_entrada.setValue('2021521');
    barcode.setValue('02874589564574152210023745');
    barcode2.setValue('00384101283841568745107845154M');
    lot.setValue('7845154M');
    qty.setValue('45');
    ean.setValue('874589564574');
    sscc.setValue('384101283841568745');
    caducitat.setValue('20221002');
    client.setValue('1');
    producte.setValue('2');
    
    expect(form.invalid).toBeFalse();
  }); 
});
