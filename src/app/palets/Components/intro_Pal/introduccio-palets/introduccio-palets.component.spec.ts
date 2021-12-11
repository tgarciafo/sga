import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { IntroduccioPaletsComponent } from './introduccio-palets.component';
import { HttpClientModule } from '@angular/common/http';

describe('IntroduccioPaletsComponent', () => {
  let component: IntroduccioPaletsComponent;
  let fixture: ComponentFixture<IntroduccioPaletsComponent>;

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
      declarations: [ IntroduccioPaletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduccioPaletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    const form = component.regEntradaForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {
    const form = component.regEntradaForm;
    const num_entrada = component.regEntradaForm.controls['num_entrada'];
    const location_id = component.regEntradaForm.controls['location_id'];
    
    num_entrada.setValue('2021521');
    location_id.setValue('2');
    
    expect(form.invalid).toBeFalse();
  });  
});
