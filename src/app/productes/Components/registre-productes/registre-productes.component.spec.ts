import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreProductesComponent } from './registre-productes.component';

describe('RegistreProductesComponent', () => {
  let component: RegistreProductesComponent;
  let fixture: ComponentFixture<RegistreProductesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreProductesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreProductesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
