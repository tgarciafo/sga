import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacioComponent } from './planificacio.component';

describe('PlanificacioComponent', () => {
  let component: PlanificacioComponent;
  let fixture: ComponentFixture<PlanificacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificacioComponent ]
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
});
