import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquejarPaletsComponent } from './bloquejar-palets.component';

describe('BloquejarPaletsComponent', () => {
  let component: BloquejarPaletsComponent;
  let fixture: ComponentFixture<BloquejarPaletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloquejarPaletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquejarPaletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
