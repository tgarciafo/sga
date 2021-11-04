import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSortidesComponent } from './consulta-sortides.component';

describe('ConsultaSortidesComponent', () => {
  let component: ConsultaSortidesComponent;
  let fixture: ComponentFixture<ConsultaSortidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaSortidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSortidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
