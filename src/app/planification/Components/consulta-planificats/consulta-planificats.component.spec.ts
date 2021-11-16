import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPlanificatsComponent } from './consulta-planificats.component';

describe('ConsultaPlanificatsComponent', () => {
  let component: ConsultaPlanificatsComponent;
  let fixture: ComponentFixture<ConsultaPlanificatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPlanificatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPlanificatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
