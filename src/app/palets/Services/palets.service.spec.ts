import { TestBed } from '@angular/core/testing';

import { PaletsService } from './palets.service';

describe('PaletsService', () => {
  let service: PaletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
