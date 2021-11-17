import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSsccComponent } from './consulta-sscc.component';

describe('ConsultaSsccComponent', () => {
  let component: ConsultaSsccComponent;
  let fixture: ComponentFixture<ConsultaSsccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaSsccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSsccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
