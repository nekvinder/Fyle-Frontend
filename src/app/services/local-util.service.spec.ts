import { TestBed } from '@angular/core/testing';

import { LocalUtilService } from './local-util.service';

describe('LocalUtilService', () => {
  let service: LocalUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
