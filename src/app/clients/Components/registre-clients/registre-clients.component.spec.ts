import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreClientsComponent } from './registre-clients.component';

describe('RegistreClientsComponent', () => {
  let component: RegistreClientsComponent;
  let fixture: ComponentFixture<RegistreClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
