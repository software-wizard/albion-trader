// services/albion-items.service.spec.ts
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {PriceService} from "./price-service";

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PriceService],
    });

    service = TestBed.inject(PriceService);
  });

  it('should load and log first 3 equipment items', (done) => {
    expect(PriceService.internalToApiId('T4_METALBAR')).toBe('T4_METALBAR');
    expect(PriceService.internalToApiId('T4_METALBAR_LEVEL1@1')).toBe('T4_METALBAR_LEVEL1@1');
    expect(PriceService.internalToApiId('T4_METALBAR_LEVEL1')).toBe('T4_METALBAR_LEVEL1@1');
    expect(PriceService.internalToApiId('T4_PLANKS')).toBe('T4_PLANKS');
    expect(PriceService.internalToApiId('T4_PLANKS_LEVEL1@1')).toBe('T4_PLANKS_LEVEL1@1');
    expect(PriceService.internalToApiId('T4_PLANKS_LEVEL1')).toBe('T4_PLANKS_LEVEL1@1');
    expect(PriceService.internalToApiId('T4_MAIN_AXE')).toBe('T4_MAIN_AXE');
    expect(PriceService.internalToApiId('T4_MAIN_AXE@1')).toBe('T4_MAIN_AXE@1');
  });
});
