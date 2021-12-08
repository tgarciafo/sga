import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProductesService } from './productes.service';

describe('ProductesService', () => {
  let service: ProductesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ProductesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
