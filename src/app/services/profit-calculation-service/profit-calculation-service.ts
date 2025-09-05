import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {City, PriceEntry} from "../../data-types/albion-price-data";
import {PriceService} from "../price-service/price-service";

export interface WeaponQuery {
  itemName: string;
  tier: number;
  enchantment: number;
}

export interface MaterialCost {
  materialName: string;
  count: number;
  unitPrice: number;
  totalCost: number;
  city: City;
}

export interface WeaponProfitData {
  itemName: string;
  tier: number;
  enchantment: number;
  materialsCost: number;
  itemPrice: number;
  profit: number;
  profitPercentage: number;
  bestCity: City;
  materials: MaterialCost[];
  calculationDate: Date;
}

export interface CategoryProfitSummary {
  categoryName: string;
  maxProfit: number;
  maxProfitPercentage: number;
  bestWeapon: WeaponProfitData;
  totalWeapons: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeaponProfitCalculationService {

  private craftingRecipeCache = new Map<string, any>();

  constructor(
    private priceService: PriceService
  ) {
  }

  calculateProfit(query: WeaponQuery, selectedCity: City): Observable<WeaponProfitData> {
    const itemId = this.buildItemId(query);

    return forkJoin({
      recipe: this.getCraftingRecipe(query),
      itemPrices: this.getItemPrices(itemId),
      materialsPrices: this.getMaterialsPrices(query)
    }).pipe(
      map(({recipe, itemPrices, materialsPrices}) => {
        return this.computeProfit(query, recipe, itemPrices, materialsPrices, selectedCity);
      }),
      catchError(error => {
        console.error('Error calculating profit:', error);
        return of(this.createErrorResult(query, selectedCity));
      })
    );
  }

  /**
   * Znajdź najlepszy profit w kategorii
   */
  getBestProfitForCategory(categoryName: string, city: City): Observable<WeaponProfitData | null> {
    // Ta metoda wymagałaby listy wszystkich broni w kategorii
    // Implementacja zależy od struktury danych o kategoriach
    return of(null);
  }

  /**
   * Oblicz profity dla wielu broni naraz (batch operation)
   */
  calculateProfitsForWeapons(queries: WeaponQuery[], city: City): Observable<WeaponProfitData[]> {
    const calculations = queries.map(query => this.calculateProfit(query, city));
    return forkJoin(calculations);
  }

  /**
   * Podsumowanie najlepszego profitu dla kategorii
   */
  getCategoryProfitSummary(weapons: WeaponProfitData[]): CategoryProfitSummary {
    if (weapons.length === 0) {
      throw new Error('No weapons provided for category summary');
    }

    const bestWeapon = weapons.reduce((best, current) =>
      current.profitPercentage > best.profitPercentage ? current : best
    );

    return {
      categoryName: weapons[0].itemName.split('_')[1], // Ekstrakcja z nazwy typu
      maxProfit: bestWeapon.profit,
      maxProfitPercentage: bestWeapon.profitPercentage,
      bestWeapon: bestWeapon,
      totalWeapons: weapons.length
    };
  }

  // ==================== PRIVATE METHODS ====================

  private buildItemId(query: WeaponQuery): string {
    let itemId = `T${query.tier}_${query.itemName}`;
    if (query.enchantment > 0) {
      itemId += `@${query.enchantment}`;
    }
    return itemId;
  }

  private getCraftingRecipe(query: WeaponQuery): Observable<any> {
    const cacheKey = `${query.itemName}_T${query.tier}_E${query.enchantment}`;

    if (this.craftingRecipeCache.has(cacheKey)) {
      return of(this.craftingRecipeCache.get(cacheKey));
    }

    const mockRecipe = this.getMockAxeRecipe(query);
    this.craftingRecipeCache.set(cacheKey, mockRecipe);

    return of(mockRecipe);
  }

  private getItemPrices(itemId: string): Observable<PriceEntry[]> {
    return this.priceService.getPrices(itemId).pipe(
      map(prices => {
        return prices;
      })
    );
  }

  private getMaterialsPrices(query: WeaponQuery): Observable<{ [materialName: string]: PriceEntry[] }> {
    const recipe = this.getMockAxeRecipe(query);
    const materialQueries = recipe.craftresource.map((resource: any) =>
      this.getItemPrices(resource["@uniquename"])
        .pipe(map(prices => ({[resource["@uniquename"]]: prices})))
    );

    return forkJoin(materialQueries).pipe(
      map(results => Object.assign({}, ...results))
    );
  }

  private computeProfit(
    query: WeaponQuery,
    recipe: any,
    itemPrices: PriceEntry[],
    materialsPrices: { [key: string]: PriceEntry[] },
    selectedCity: City
  ): WeaponProfitData {

    // Znajdź cenę sprzedaży przedmiotu w wybranym mieście
    const itemPrice = this.getBestItemPrice(itemPrices, selectedCity);

    // Oblicz koszty materiałów
    const materials: MaterialCost[] = [];
    let totalMaterialsCost = 0;

    recipe.craftresource.forEach((resource: any) => {
      const materialName = resource["@uniquename"];
      const count = parseInt(resource["@count"]);
      const materialPrices = materialsPrices[materialName] || [];

      const bestPrice = this.getBestMaterialPrice(materialPrices, selectedCity);
      const totalCost = bestPrice * count;

      materials.push({
        materialName,
        count,
        unitPrice: bestPrice,
        totalCost,
        city: selectedCity
      });

      totalMaterialsCost += totalCost;
    });

    // Oblicz profit
    const profit = itemPrice - totalMaterialsCost;
    const profitPercentage = totalMaterialsCost > 0 ? (profit / totalMaterialsCost) * 100 : 0;

    return {
      itemName: this.buildItemId(query),
      tier: query.tier,
      enchantment: query.enchantment,
      materialsCost: totalMaterialsCost,
      itemPrice,
      profit,
      profitPercentage,
      bestCity: selectedCity,
      materials,
      calculationDate: new Date()
    };
  }

  /**
   * Znajdź najlepszą cenę sprzedaży przedmiotu
   */
  private getBestItemPrice(prices: PriceEntry[], city: City): number {
    const cityPrices = prices.filter(p => p.city === city);
    if (cityPrices.length === 0) return 0;

    // Używamy sell_price_min jako cenę sprzedaży (to co możemy otrzymać)
    const validPrices = cityPrices.filter(p => p.sell_price_min > 10); // Odfiltruj placeholder ceny
    if (validPrices.length === 0) return 0;

    return Math.max(...validPrices.map(p => p.sell_price_min));
  }

  /**
   * Znajdź najlepszą cenę zakupu materiału
   */
  private getBestMaterialPrice(prices: PriceEntry[], city: City): number {
    const cityPrices = prices.filter(p => p.city === city);
    if (cityPrices.length === 0) return 0;

    // Używamy sell_price_min jako cenę zakupu materiałów (to co musimy zapłacić)
    const validPrices = cityPrices.filter(p => p.sell_price_min > 10); // Odfiltruj placeholder ceny
    if (validPrices.length === 0) return 0;

    return Math.min(...validPrices.map(p => p.sell_price_min));
  }

  /**
   * Tworzy pusty wynik w przypadku błędu
   */
  private createErrorResult(query: WeaponQuery, city: City): WeaponProfitData {
    return {
      itemName: this.buildItemId(query),
      tier: query.tier,
      enchantment: query.enchantment,
      materialsCost: 0,
      itemPrice: 0,
      profit: 0,
      profitPercentage: 0,
      bestCity: city,
      materials: [],
      calculationDate: new Date()
    };
  }
}
