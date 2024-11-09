import { TestBed } from '@angular/core/testing';

import { ApiguardService } from './apiguard.service';

describe('ApiguardService', () => {
  let service: ApiguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
