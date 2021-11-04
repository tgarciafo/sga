import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaBlockComponent } from './consulta-block.component';

describe('ConsultaBlockComponent', () => {
  let component: ConsultaBlockComponent;
  let fixture: ComponentFixture<ConsultaBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
