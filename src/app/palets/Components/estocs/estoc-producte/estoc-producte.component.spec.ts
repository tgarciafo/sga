import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstocProducteComponent } from './estoc-producte.component';

describe('EstocProducteComponent', () => {
  let component: EstocProducteComponent;
  let fixture: ComponentFixture<EstocProducteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstocProducteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstocProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
