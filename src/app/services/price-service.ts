import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PriceEntry} from "../data-types/albion-price-data";

export const BASE_MAP: Record<string, string> = {
  ore: 'ORE',
  wood: 'WOOD',
  fiber: 'FIBER',
  hide: 'HIDE',

  metal_bar: 'METALBAR',
  plank: 'PLANKS',
  cloth: 'CLOTH',
  leather: 'LEATHER',
};

@Injectable({providedIn: 'root'})
export class PriceService {
  private readonly API_BASE_URL = 'https://europe.albion-online-data.com/api/v2/stats/prices';
  private readonly MAX_QUERY_LENGTH = 4000;

  private pricesCache = new Map<string, PriceEntry[]>();
  private isInitialized$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.initializePrices();
  }

  static internalToApiId(id: string): string {
    if (/(?:^|_)(?:ORE|WOOD|FIBER|HIDE|METALBAR|PLANKS|CLOTH|LEATHER)(?:_|$)/.test(id) && !/@\d+$/.test(id)) {
      const m = id.match(/_LEVEL(\d+)/);
      if (m) return id + '@' + m[1];
    }
    return id;
  }

  private initializePrices(): void {
    const itemsToFetch = this.generateItemsList();
    const chunks = this.chunkItems(itemsToFetch, this.MAX_QUERY_LENGTH);

    const requests = chunks.map(chunk =>
      this.fetchPricesChunk(chunk).pipe(
        catchError(error => {
          console.error('Error fetching price chunk:', error);
          return of([]);
        })
      )
    );

    forkJoin(requests).subscribe(results => {
      const allPrices = results.flat();
      this.cachePrices(allPrices);
      this.isInitialized$.next(true);
      console.log(`Initialized prices for ${allPrices.length} items`);
    });
  }

  private generateItemsList(): string[] {
    const items: string[] = [];
    const tiers = ['T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
    const enchantLevels = [0, 1, 2, 3, 4]; // 0 = base, 1-4 = enchants

    Object.values(BASE_MAP).forEach(baseName => {
      tiers.forEach(tier => {
        enchantLevels.forEach(enchantLevel => {
          if (enchantLevel === 0) {
            // Base item without enchant
            items.push(`${tier}_${baseName}`);
          } else {
            // Enchanted item
            items.push(`${tier}_${baseName}_LEVEL${enchantLevel}@${enchantLevel}`);
          }
        });
      });
    });

    return items;
  }

  private chunkItems(items: string[], maxLength: number): string[][] {
    const chunks: string[][] = [];
    let currentChunk: string[] = [];
    let currentLength = 0;

    for (const item of items) {
      const itemLength = item.length + 1; // +1 for comma

      if (currentLength + itemLength > maxLength && currentChunk.length > 0) {
        chunks.push([...currentChunk]);
        currentChunk = [];
        currentLength = 0;
      }

      currentChunk.push(item);
      currentLength += itemLength;
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  private fetchPricesChunk(items: string[]): Observable<PriceEntry[]> {
    const itemsParam = items.join(',');
    const url = `${this.API_BASE_URL}/${itemsParam}`;

    return this.http.get<PriceEntry[]>(url).pipe(
      map(response => response || [])
    );
  }

  private cachePrices(apiPrices: PriceEntry[]): void {
    const groupedPrices = new Map<string, PriceEntry[]>();

    apiPrices.forEach(apiPrice => {
      // Filter only quality 1 as requested
      if (apiPrice.quality !== 1) return;

      const priceEntry: PriceEntry = {
        item_id: apiPrice.item_id,
        city: apiPrice.city as any, // Type assertion for City enum
        quality: apiPrice.quality as any, // Type assertion for ItemQuality enum
        sell_price_min: apiPrice.sell_price_min,
        sell_price_min_date: apiPrice.sell_price_min_date,
        sell_price_max: apiPrice.sell_price_max,
        sell_price_max_date: apiPrice.sell_price_max_date,
        buy_price_min: apiPrice.buy_price_min,
        buy_price_min_date: apiPrice.buy_price_min_date,
        buy_price_max: apiPrice.buy_price_max,
        buy_price_max_date: apiPrice.buy_price_max_date
      };

      if (!groupedPrices.has(apiPrice.item_id)) {
        groupedPrices.set(apiPrice.item_id, []);
      }
      groupedPrices.get(apiPrice.item_id)!.push(priceEntry);
    });

    this.pricesCache = groupedPrices;
  }

  getPrices(uniqueName: string): Observable<PriceEntry[]> {
    const apiId = PriceService.internalToApiId(uniqueName);

    return this.isInitialized$.pipe(
      map(initialized => {
        if (!initialized) {
          console.warn('PriceService not yet initialized');
          return [];
        }

        const cached = this.pricesCache.get(apiId);
        if (cached) {
          return cached;
        }

        // If not in cache, try to fetch individual item
        this.fetchIndividualItem(apiId);
        return [];
      })
    );
  }

  private fetchIndividualItem(itemId: string): void {
    const url = `${this.API_BASE_URL}/${itemId}`;

    this.http.get<PriceEntry[]>(url).pipe(
      catchError(error => {
        console.error(`Error fetching individual item ${itemId}:`, error);
        return of([]);
      })
    ).subscribe(response => {
      this.cachePrices(response);
    });
  }

  // Method for testing/debugging
  getAllCachedPrices(): Map<string, PriceEntry[]> {
    return new Map(this.pricesCache);
  }

  isInitialized(): Observable<boolean> {
    return this.isInitialized$.asObservable();
  }
}
