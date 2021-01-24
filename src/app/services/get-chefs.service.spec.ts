import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GetChefsService } from './get-chefs.service';

describe('GetChefsService', () => {
  let service: GetChefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GetChefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
