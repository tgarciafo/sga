import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduccioPaletsComponent } from './introduccio-palets.component';

describe('IntroduccioPaletsComponent', () => {
  let component: IntroduccioPaletsComponent;
  let fixture: ComponentFixture<IntroduccioPaletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroduccioPaletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduccioPaletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
