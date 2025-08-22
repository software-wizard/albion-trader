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

  it('should fetch and display prices for random items', (done) => {
    service.isInitialized().subscribe(initialized => {
      if (initialized) {
        // Get all possible items and pick 100 random ones
        const allItems = service.getAllPossibleItems();
        const randomItems = getRandomItems(allItems, 100);

        console.log(`🎲 Testing ${randomItems.length} random items from ${allItems.length} total items`);
        console.log('='.repeat(80));

        let processedCount = 0;
        let itemsWithoutPrices: string[] = [];
        let itemsWithPrices: string[] = [];

        randomItems.forEach((itemName, index) => {
          service.getPrices(itemName).subscribe(prices => {
            processedCount++;

            if (prices.length === 0) {
              itemsWithoutPrices.push(itemName);
              console.log(`❌ ${itemName}: NO PRICES FOUND`);
            } else {
              // Check if any price is > 0 (sell_price_min, sell_price_max, buy_price_min, buy_price_max)
              const hasAnyPrice = prices.some(p =>
                p.sell_price_min > 0 || p.sell_price_max > 0 || p.buy_price_min > 0 || p.buy_price_max > 0
              );

              if (hasAnyPrice) {
                itemsWithPrices.push(itemName);

                // Show cities with any non-zero prices
                const pricesFormatted = prices
                  .filter(p => p.sell_price_min > 0 || p.buy_price_min > 0)
                  .map(p => {
                    const sellPrice = p.sell_price_min > 0 ? `sell:${p.sell_price_min}` : '';
                    const buyPrice = p.buy_price_min > 0 ? `buy:${p.buy_price_min}` : '';
                    const priceInfo = [sellPrice, buyPrice].filter(Boolean).join(' ');
                    return `${p.city}: ${priceInfo}`;
                  })
                  .join(', ');

                console.log(`✅ ${itemName}: ${pricesFormatted}`);
              } else {
                console.log(`⚠️ ${itemName}: Found entries but all prices are 0`);
                itemsWithoutPrices.push(itemName);
              }
            }

            // When all items are processed, show summary
            if (processedCount === randomItems.length) {
              console.log('='.repeat(80));
              console.log('📊 SUMMARY REPORT:');
              console.log(`📈 Items with prices: ${itemsWithPrices.length}`);
              console.log(`📉 Items without prices: ${itemsWithoutPrices.length}`);
              console.log(`🎯 Success rate: ${((itemsWithPrices.length / randomItems.length) * 100).toFixed(1)}%`);

              if (itemsWithoutPrices.length > 0) {
                console.log('\n❌ Items without prices:');
                itemsWithoutPrices.forEach(item => console.log(`   - ${item}`));
              }

              console.log('\n🎲 Random items tested:');
              randomItems.slice(0, 10).forEach(item => console.log(`   - ${item}`));
              if (randomItems.length > 10) {
                console.log(`   ... and ${randomItems.length - 10} more`);
              }

              done();
            }
          });
        });
      }
    });
  }, 60000); // Increased timeout for API calls

  function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, array.length));
  }
});
