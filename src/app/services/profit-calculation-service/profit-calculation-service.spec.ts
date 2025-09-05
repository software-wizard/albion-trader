import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeaponProfitCalculationService, WeaponQuery, WeaponProfitData } from './weapon-profit-calculation.service';
import { PriceService } from './price-service/price-service';
import { City, PriceEntry } from '../data-types/albion-price-data';

describe('WeaponProfitCalculationService', () => {
  let service: WeaponProfitCalculationService;
  let priceServiceSpy: jasmine.SpyObj<PriceService>;

  // Mock data na podstawie plików
  const mockT4AxePrices: PriceEntry[] = [
    {
      item_id: 'T4_MAIN_AXE',
      city: City.Lymhurst,
      quality: 1,
      sell_price_min: 18870,
      sell_price_min_date: '2025-08-06T00:20:00',
      sell_price_max: 9858,
      sell_price_max_date: '2025-08-06T00:20:00',
      buy_price_min: 1,
      buy_price_min_date: '2025-08-06T00:35:00',
      buy_price_max: 4308,
      buy_price_max_date: '2025-08-06T00:35:00'
    },
    {
      item_id: 'T4_MAIN_AXE',
      city: City.Caerleon,
      quality: 1,
      sell_price_min: 17993,
      sell_price_min_date: '2025-08-06T00:25:00',
      sell_price_max: 14991,
      sell_price_max_date: '2025-08-06T00:25:00',
      buy_price_min: 0,
      buy_price_min_date: '0001-01-01T00:00:00',
      buy_price_max: 0,
      buy_price_max_date: '0001-01-01T00:00:00'
    }
  ];

  const mockT4AxeEnchanted1Prices: PriceEntry[] = [
    {
      item_id: 'T4_MAIN_AXE@1',
      city: City.Lymhurst,
      quality: 1,
      sell_price_min: 8870,
      sell_price_min_date: '2025-08-06T00:20:00',
      sell_price_max: 9858,
      sell_price_max_date: '2025-08-06T00:20:00',
      buy_price_min: 1,
      buy_price_min_date: '2025-08-06T00:35:00',
      buy_price_max: 4308,
      buy_price_max_date: '2025-08-06T00:35:00'
    }
  ];

  const mockT4PlanksPrice: PriceEntry[] = [
    {
      item_id: 'T4_PLANKS',
      city: City.Lymhurst,
      quality: 1,
      sell_price_min: 199,
      sell_price_min_date: '2025-08-07T14:00:00',
      sell_price_max: 124,
      sell_price_max_date: '2025-08-07T14:00:00',
      buy_price_min: 0,
      buy_price_min_date: '2025-08-07T14:00:00',
      buy_price_max: 88,
      buy_price_max_date: '2025-08-07T14:00:00'
    }
  ];

  const mockT4MetalBarPrice: PriceEntry[] = [
    {
      item_id: 'T4_METALBAR',
      city: City.Lymhurst,
      quality: 1,
      sell_price_min: 1206,
      sell_price_min_date: '2025-08-07T14:00:00',
      sell_price_max: 234,
      sell_price_max_date: '2025-08-07T14:00:00',
      buy_price_min: 1,
      buy_price_min_date: '2025-08-07T14:00:00',
      buy_price_max: 200,
      buy_price_max_date: '2025-08-07T14:00:00'
    }
  ];

  const mockT4PlanksLevel1Price: PriceEntry[] = [
    {
      item_id: 'T4_PLANKS_LEVEL1@1',
      city: City.Lymhurst,
      quality: 1,
      sell_price_min: 99,
      sell_price_min_date: '2025-08-07T14:00:00',
      sell_price_max: 124,
      sell_price_max_date: '2025-08-07T14:00:00',
      buy_price_min: 0,
      buy_price_min_date: '2025-08-07T14:00:00',
      buy_price_max: 88,
      buy_price_max_date: '2025-08-07T14:00:00'
    }
  ];

  const mockT4MetalBarLevel1Price: PriceEntry[] = [
    {
      item_id: 'T4_METALBAR_LEVEL1@1',
      city: City.Lymhurst,
      quality: 1,
      sell_price_min: 206,
      sell_price_min_date: '2025-08-07T14:00:00',
      sell_price_max: 234,
      sell_price_max_date: '2025-08-07T14:00:00',
      buy_price_min: 1,
      buy_price_min_date: '2025-08-07T14:00:00',
      buy_price_max: 200,
      buy_price_max_date: '2025-08-07T14:00:00'
    }
  ];

  beforeEach(() => {
    const priceServiceSpyObj = jasmine.createSpyObj('PriceService', ['getPrices']);

    TestBed.configureTestingModule({
      providers: [
        WeaponProfitCalculationService,
        { provide: PriceService, useValue: priceServiceSpyObj }
      ]
    });

    service = TestBed.inject(WeaponProfitCalculationService);
    priceServiceSpy = TestBed.inject(PriceService) as jasmine.SpyObj<PriceService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateProfit for T4 Axe (no enchantment)', () => {
    const axeQuery: WeaponQuery = {
      itemName: 'MAIN_AXE',
      tier: 4,
      enchantment: 0
    };

    beforeEach(() => {
      // Setup mock responses
      priceServiceSpy.getPrices.and.callFake((itemId: string) => {
        switch (itemId) {
          case 'T4_MAIN_AXE':
            return of(mockT4AxePrices);
          case 'T4_PLANKS':
            return of(mockT4PlanksPrice);
          case 'T4_METALBAR':
            return of(mockT4MetalBarPrice);
          default:
            return of([]);
        }
      });
    });

    it('should calculate profit correctly for T4 Axe in Lymhurst', (done) => {
      service.calculateProfit(axeQuery, City.Lymhurst).subscribe(result => {
        expect(result).toBeDefined();
        expect(result.itemName).toBe('T4_MAIN_AXE');
        expect(result.tier).toBe(4);
        expect(result.enchantment).toBe(0);
        expect(result.bestCity).toBe(City.Lymhurst);

        // Oczekiwane koszty: 8 * 199 (planks) + 16 * 1206 (metalbar) = 1592 + 19296 = 20888
        expect(result.materialsCost).toBe(20888);

        // Oczekiwana cena sprzedaży: 18870 (najwyższa cena w Lymhurst)
        expect(result.itemPrice).toBe(18870);

        // Oczekiwany profit: 18870 - 20888 = -2018
        expect(result.profit).toBe(-2018);

        // Oczekiwany profit%: (-2018 / 20888) * 100 ≈ -9.66%
        expect(result.profitPercentage).toBeCloseTo(-9.66, 1);

        // Sprawdź materiały
        expect(result.materials).toHaveSize(2);

        const planks = result.materials.find(m => m.materialName === 'T4_PLANKS');
        expect(planks).toBeDefined();
        expect(planks!.count).toBe(8);
        expect(planks!.unitPrice).toBe(199);
        expect(planks!.totalCost).toBe(1592);

        const metalbar = result.materials.find(m => m.materialName === 'T4_METALBAR');
        expect(metalbar).toBeDefined();
        expect(metalbar!.count).toBe(16);
        expect(metalbar!.unitPrice).toBe(1206);
        expect(metalbar!.totalCost).toBe(19296);

        expect(result.calculationDate).toBeInstanceOf(Date);

        done();
      });
    });

    it('should return zero profit when no valid prices available', (done) => {
      // Mock zwracający puste ceny
      priceServiceSpy.getPrices.and.returnValue(of([]));

      service.calculateProfit(axeQuery, City.Thetford).subscribe(result => {
        expect(result.itemPrice).toBe(0);
        expect(result.materialsCost).toBe(0);
        expect(result.profit).toBe(0);
        expect(result.profitPercentage).toBe(0);
        done();
      });
    });
  });

  describe('calculateProfit for T4 Axe @1 (enchanted)', () => {
    const enchantedAxeQuery: WeaponQuery = {
      itemName: 'MAIN_AXE',
      tier: 4,
      enchantment: 1
    };

    beforeEach(() => {
      priceServiceSpy.getPrices.and.callFake((itemId: string) => {
        switch (itemId) {
          case 'T4_MAIN_AXE@1':
            return of(mockT4AxeEnchanted1Prices);
          case 'T4_PLANKS_LEVEL1':
            return of(mockT4PlanksLevel1Price);
          case 'T4_METALBAR_LEVEL1':
            return of(mockT4MetalBarLevel1Price);
          default:
            return of([]);
        }
      });
    });

    it('should calculate profit correctly for enchanted T4 Axe in Lymhurst', (done) => {
      service.calculateProfit(enchantedAxeQuery, City.Lymhurst).subscribe(result => {
        expect(result.itemName).toBe('T4_MAIN_AXE@1');
        expect(result.enchantment).toBe(1);

        // Koszty: 8 * 99 (planks_level1) + 16 * 206 (metalbar_level1) = 792 + 3296 = 4088
        expect(result.materialsCost).toBe(4088);

        // Cena sprzedaży: 8870
        expect(result.itemPrice).toBe(8870);

        // Profit: 8870 - 4088 = 4782
        expect(result.profit).toBe(4782);

        // Profit%: (4782 / 4088) * 100 ≈ 116.98%
        expect(result.profitPercentage).toBeCloseTo(116.98, 1);

        done();
      });
    });
  });

  describe('buildItemId method', () => {
    it('should build correct item ID for non-enchanted weapon', () => {
      const query: WeaponQuery = { itemName: 'MAIN_AXE', tier: 4, enchantment: 0 };
      // Testujemy przez publiczną metodę która używa buildItemId
      service.calculateProfit(query, City.Lymhurst).subscribe(result => {
        expect(result.itemName).toBe('T4_MAIN_AXE');
      });
    });

    it('should build correct item ID for enchanted weapon', () => {
      const query: WeaponQuery = { itemName: 'MAIN_AXE', tier: 5, enchantment: 2 };
      service.calculateProfit(query, City.Lymhurst).subscribe(result => {
        expect(result.itemName).toBe('T5_MAIN_AXE@2');
      });
    });
  });

  describe('calculateProfitsForWeapons (batch operation)', () => {
    it('should calculate profits for multiple weapons', (done) => {
      const queries: WeaponQuery[] = [
        { itemName: 'MAIN_AXE', tier: 4, enchantment: 0 },
        { itemName: 'MAIN_AXE', tier: 4, enchantment: 1 }
      ];

      // Setup mocks
      priceServiceSpy.getPrices.and.callFake((itemId: string) => {
        switch (itemId) {
          case 'T4_MAIN_AXE':
            return of(mockT4AxePrices);
          case 'T4_MAIN_AXE@1':
            return of(mockT4AxeEnchanted1Prices);
          case 'T4_PLANKS':
            return of(mockT4PlanksPrice);
          case 'T4_METALBAR':
            return of(mockT4MetalBarPrice);
          case 'T4_PLANKS_LEVEL1':
            return of(mockT4PlanksLevel1Price);
          case 'T4_METALBAR_LEVEL1':
            return of(mockT4MetalBarLevel1Price);
          default:
            return of([]);
        }
      });

      service.calculateProfitsForWeapons(queries, City.Lymhurst).subscribe(results => {
        expect(results).toHaveSize(2);

        const normalAxe = results.find(r => r.enchantment === 0);
        const enchantedAxe = results.find(r => r.enchantment === 1);

        expect(normalAxe).toBeDefined();
        expect(enchantedAxe).toBeDefined();

        expect(normalAxe!.profit).toBe(-2018);
        expect(enchantedAxe!.profit).toBe(4782);

        done();
      });
    });
  });

  describe('getCategoryProfitSummary', () => {
    it('should return correct summary for category', () => {
      const weapons: WeaponProfitData[] = [
        {
          itemName: 'T4_MAIN_AXE',
          tier: 4,
          enchantment: 0,
          materialsCost: 1000,
          itemPrice: 800,
          profit: -200,
          profitPercentage: -20,
          bestCity: City.Lymhurst,
          materials: [],
          calculationDate: new Date()
        },
        {
          itemName: 'T4_MAIN_AXE@1',
          tier: 4,
          enchantment: 1,
          materialsCost: 1000,
          itemPrice: 1500,
          profit: 500,
          profitPercentage: 50,
          bestCity: City.Lymhurst,
          materials: [],
          calculationDate: new Date()
        }
      ];

      const summary = service.getCategoryProfitSummary(weapons);

      expect(summary.categoryName).toBe('MAIN');
      expect(summary.maxProfit).toBe(500);
      expect(summary.maxProfitPercentage).toBe(50);
      expect(summary.bestWeapon.enchantment).toBe(1);
      expect(summary.totalWeapons).toBe(2);
    });

    it('should throw error for empty weapons array', () => {
      expect(() => service.getCategoryProfitSummary([])).toThrowError('No weapons provided for category summary');
    });
  });

  describe('Error handling', () => {
    it('should handle price service errors gracefully', (done) => {
      priceServiceSpy.getPrices.and.returnValue(of([]));

      const query: WeaponQuery = { itemName: 'MAIN_AXE', tier: 4, enchantment: 0 };

      service.calculateProfit(query, City.Lymhurst).subscribe(result => {
        expect(result).toBeDefined();
        expect(result.profit).toBe(0);
        expect(result.itemPrice).toBe(0);
        expect(result.materialsCost).toBe(0);
        done();
      });
    });
  });
});
