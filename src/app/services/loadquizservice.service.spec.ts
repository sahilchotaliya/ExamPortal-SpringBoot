import { TestBed } from '@angular/core/testing';

import { LoadquizserviceService } from './loadquizservice.service';

describe('LoadquizserviceService', () => {
  let service: LoadquizserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadquizserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
