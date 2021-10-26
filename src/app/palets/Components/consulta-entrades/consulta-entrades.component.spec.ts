import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEntradesComponent } from './consulta-entrades.component';

describe('ConsultaEntradesComponent', () => {
  let component: ConsultaEntradesComponent;
  let fixture: ComponentFixture<ConsultaEntradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEntradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEntradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
