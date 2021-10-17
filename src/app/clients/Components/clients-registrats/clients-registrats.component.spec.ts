import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsRegistratsComponent } from './clients-registrats.component';

describe('ClientsRegistratsComponent', () => {
  let component: ClientsRegistratsComponent;
  let fixture: ComponentFixture<ClientsRegistratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsRegistratsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsRegistratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
