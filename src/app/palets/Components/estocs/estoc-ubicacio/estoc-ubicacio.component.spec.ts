import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstocUbicacioComponent } from './estoc-ubicacio.component';

describe('EstocUbicacioComponent', () => {
  let component: EstocUbicacioComponent;
  let fixture: ComponentFixture<EstocUbicacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstocUbicacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstocUbicacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
