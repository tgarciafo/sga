import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { SortidesComponent } from './sortides.component';
import { HttpClientModule } from '@angular/common/http';

describe('SortidesComponent', () => {
  let component: SortidesComponent;
  let fixture: ComponentFixture<SortidesComponent>;

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
      declarations: [ SortidesComponent ],
      providers: [ DatePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari inicial com a no vàlid', () => {
    const form = component.sortidaForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari inicial com a vàlid', () => {
    const form = component.sortidaForm;
    const num_sortida = component.sortidaForm.controls['num_sortida'];

    num_sortida.setValue('2021521');
    
    expect(form.invalid).toBeFalse();
  }); 

  it('Ha de retornar el formulari de sortida com a no vàlid', () => {
    const form = component.sortidaForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari de sortida com a vàlid', () => {
    const form = component.sortidaForm2;
    const albara_sortida = component.sortidaForm2.controls['albara_sortida'];
    const barcode = component.sortidaForm2.controls['barcode'];
    const sscc = component.sortidaForm2.controls['sscc'];

    albara_sortida.setValue('2021521');
    barcode.setValue('00384101283841568745');
    sscc.setValue('384101283841568745');
    
    expect(form.invalid).toBeFalse();
  }); 
});
