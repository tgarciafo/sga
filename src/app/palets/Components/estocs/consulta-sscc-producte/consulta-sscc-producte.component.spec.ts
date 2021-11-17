import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSsccProducteComponent } from './consulta-sscc-producte.component';

describe('ConsultaSsccProducteComponent', () => {
  let component: ConsultaSsccProducteComponent;
  let fixture: ComponentFixture<ConsultaSsccProducteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaSsccProducteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSsccProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
