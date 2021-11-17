import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstocLotComponent } from './estoc-lot.component';

describe('EstocLotComponent', () => {
  let component: EstocLotComponent;
  let fixture: ComponentFixture<EstocLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstocLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstocLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
