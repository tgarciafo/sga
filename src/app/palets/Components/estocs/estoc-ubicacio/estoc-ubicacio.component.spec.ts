import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { EstocUbicacioComponent } from './estoc-ubicacio.component';

describe('EstocUbicacioComponent', () => {
  let component: EstocUbicacioComponent;
  let fixture: ComponentFixture<EstocUbicacioComponent>;

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
      declarations: [ EstocUbicacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstocUbicacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ha de retornar el formulari com a no vàlid', () => {
    
    const form = component.estocUbicacioForm;
    
    expect(form.invalid).toBeTrue();
  });

  it('Ha de retornar el formulari com a vàlid', () => {

    const form = component.estocUbicacioForm;
    const client_id = component.estocUbicacioForm.controls['client_id'];
    const location_id = component.estocUbicacioForm.controls['location_id'];
    const data = component.estocUbicacioForm.controls['data'];
    location_id.setValue('1');
    client_id.setValue('1');
    data.setValue('20211101');

    expect(form.invalid).toBeFalse();
  }); 
});
