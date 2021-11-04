import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortidesComponent } from './sortides.component';

describe('SortidesComponent', () => {
  let component: SortidesComponent;
  let fixture: ComponentFixture<SortidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
