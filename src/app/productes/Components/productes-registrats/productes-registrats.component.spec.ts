import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductesRegistratsComponent } from './productes-registrats.component';

describe('ProductesRegistratsComponent', () => {
  let component: ProductesRegistratsComponent;
  let fixture: ComponentFixture<ProductesRegistratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductesRegistratsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductesRegistratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
