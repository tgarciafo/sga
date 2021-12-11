import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { PlanificacioComponent } from './planificacio.component';
import { DatePipe } from '@angular/common';

describe('PlanificacioComponent', () => {
  let component: PlanificacioComponent;
  let fixture: ComponentFixture<PlanificacioComponent>;

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
      declarations: [ PlanificacioComponent ],
      providers: [DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari inicial com a no vàlid', () => {
    
    const form = component.planificacioForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari inicial com a vàlid', () => {

    const form = component.planificacioForm;
    const num_sortida = component.planificacioForm.controls['num_sortida'];
    const idClient = component.planificacioForm.controls['idClient'];
    num_sortida.setValue('2021521');
    idClient.setValue('1');

    expect(form.invalid).toBeFalse();
  }); 

  it('Ha de retornar el formulari de planificació com a no vàlid', () => {
    component.getPlanification();

    fixture.detectChanges();

    const form = component.planificacioForm2;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari de planificació com a vàlid', () => {
    component.getPlanification();

    fixture.detectChanges();
    
    const form = component.planificacioForm2;
    const albara_sortida = component.planificacioForm2.controls['albara_sortida'];
    const product_id = component.planificacioForm2.controls['product_id'];
    const num_palets = component.planificacioForm2.controls['num_palets'];
    
    albara_sortida.setValue('2021521');
    product_id.setValue('2');
    num_palets.setValue('5');
    
    expect(form.invalid).toBeFalse();
  });
  
    
});
