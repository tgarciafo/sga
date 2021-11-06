import { TestBed } from '@angular/core/testing';

import { BloquejatsService } from './bloquejats.service';

describe('BloquejatsService', () => {
  let service: BloquejatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloquejatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
