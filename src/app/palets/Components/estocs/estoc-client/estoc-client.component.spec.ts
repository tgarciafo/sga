import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstocClientComponent } from './estoc-client.component';

describe('EstocClientComponent', () => {
  let component: EstocClientComponent;
  let fixture: ComponentFixture<EstocClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstocClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstocClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
