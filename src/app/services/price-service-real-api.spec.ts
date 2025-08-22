import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {PriceService} from './price-service';

describe('PriceService API test', () => {
  let service: PriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PriceService],
    });

    service = TestBed.inject(PriceService);
  });

  it('should fetch and display prices for resources and products', (done) => {
    const testItems = [
      'T4_ORE',
      'T4_PLANKS',
      'T4_FIBER',
      'T4_HIDE',

      'T4_METALBAR_LEVEL1@1',
      'T4_PLANKS_LEVEL1@1',
      'T4_LEATHER_LEVEL1@1',
      'T4_HIDE_LEVEL1@1',

      'T4_METALBAR_LEVEL1@1',
      'T4_PLANKS_LEVEL2@2',
      'T4_LEATHER_LEVEL3@3',
      'T4_HIDE_LEVEL4@4',
    ];

    service.isInitialized().subscribe(initialized => {
      if (initialized) {
        testItems.forEach(itemName => {
          service.getPrices(itemName).subscribe(prices => {
            const pricesFormatted = prices.map(p => `${p.city}: ${p.sell_price_min}`).join(', ');
            console.log(`${itemName}: ${pricesFormatted}`);
          });
        });
        done();
      }
    });
  }, 30000);
});
