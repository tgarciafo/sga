import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { appReducers } from 'src/app/app.reducers';
import { LocationsRegistradesComponent } from './locations-registrades.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LocationsRegistradesComponent', () => {
  let component: LocationsRegistradesComponent;
  let fixture: ComponentFixture<LocationsRegistradesComponent>;

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
      declarations: [ LocationsRegistradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsRegistradesComponent);
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
    const location_id = component.editForm.controls['location_id'];
    const location_description = component.editForm.controls['location_description'];
    location_id.setValue('3');
    location_description.setValue('Nau Externa');

    expect(form.invalid).toBeFalse();
  });  
});
