import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaBloquejatsComponent } from './consulta-bloquejats.component';

describe('ConsultaBloquejatsComponent', () => {
  let component: ConsultaBloquejatsComponent;
  let fixture: ComponentFixture<ConsultaBloquejatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaBloquejatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaBloquejatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
