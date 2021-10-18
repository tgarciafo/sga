import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsRegistradesComponent } from './locations-registrades.component';

describe('LocationsRegistradesComponent', () => {
  let component: LocationsRegistradesComponent;
  let fixture: ComponentFixture<LocationsRegistradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
