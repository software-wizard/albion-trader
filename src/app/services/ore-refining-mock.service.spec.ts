import { TestBed } from '@angular/core/testing';

import { OreRefiningMockService } from './ore-refining-mock.service';

describe('OreRefiningMockService', () => {
  let service: OreRefiningMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OreRefiningMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
