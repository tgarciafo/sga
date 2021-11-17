import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstocAlbaraComponent } from './estoc-albara.component';

describe('EstocAlbaraComponent', () => {
  let component: EstocAlbaraComponent;
  let fixture: ComponentFixture<EstocAlbaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstocAlbaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstocAlbaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
