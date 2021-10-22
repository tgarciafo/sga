import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduccioPalets2Component } from './introduccio-palets2.component';

describe('IntroduccioPalets2Component', () => {
  let component: IntroduccioPalets2Component;
  let fixture: ComponentFixture<IntroduccioPalets2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroduccioPalets2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduccioPalets2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
