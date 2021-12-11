import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaSsccComponent } from './consulta-sscc.component';

describe('ConsultaSsccComponent', () => {
  let component: ConsultaSsccComponent;
  let fixture: ComponentFixture<ConsultaSsccComponent>;

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
      declarations: [ ConsultaSsccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSsccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    
    const form = component.consultaSSCCForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {

    const form = component.consultaSSCCForm;
    const num_sscc = component.consultaSSCCForm.controls['num_sscc'];
    num_sscc.setValue('00384101283809154784');

    expect(form.invalid).toBeFalse();
  }); 
});
