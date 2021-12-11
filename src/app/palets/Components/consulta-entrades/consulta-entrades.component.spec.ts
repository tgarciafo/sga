import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { ConsultaEntradesComponent } from './consulta-entrades.component';
import { HttpClientModule } from '@angular/common/http';

describe('ConsultaEntradesComponent', () => {
  let component: ConsultaEntradesComponent;
  let fixture: ComponentFixture<ConsultaEntradesComponent>;

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
      declarations: [ ConsultaEntradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEntradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    
    const form = component.consultaEntForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {

    const form = component.consultaEntForm;
    const data = component.consultaEntForm.controls['data'];
    const data2 = component.consultaEntForm.controls['data2'];
    data.setValue('20210521');
    data2.setValue('20211001');

    expect(form.invalid).toBeFalse();
  }); 
});
