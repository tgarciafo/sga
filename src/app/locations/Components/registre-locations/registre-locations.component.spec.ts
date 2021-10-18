import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreLocationsComponent } from './registre-locations.component';

describe('RegistreLocationsComponent', () => {
  let component: RegistreLocationsComponent;
  let fixture: ComponentFixture<RegistreLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
