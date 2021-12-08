import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PlanificationService } from './planification.service';

describe('PlanificationService', () => {
  let service: PlanificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(PlanificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
