import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PriceEntry} from "../../data-types/albion-price-data";
import {MATERIALS_MAP, WEAPONS_MAP} from './static-item-names';

@Injectable({providedIn: 'root'})
export class PriceService {
  private readonly API_BASE_URL = 'https://europe.albion-online-data.com/api/v2/stats/prices';
  private readonly MAX_QUERY_LENGTH = 3800;

  private pricesCache = new Map<string, PriceEntry[]>();
  private isInitialized$ = new BehaviorSubject<boolean>(false);
  private materialNames = Object.values(MATERIALS_MAP);

  static internalToApiId(id: string): string {
    // For resources like ORE_LEVEL1 -> ORE_LEVEL1@1
    if (/(?:^|_)(?:ORE|WOOD|FIBER|HIDE|METALBAR|PLANKS|CLOTH|LEATHER|STONEBLOCK)(?:_|$)/.test(id) && !/@\d+$/.test(id)) {
      const m = id.match(/_LEVEL(\d+)/);
      if (m) return id + '@' + m[1];
    }
    return id;
  }

  constructor(private http: HttpClient) {
    this.initializePrices();
  }

  private initializePrices(): void {
    const allItems = this.generateItemsList();
    console.log(`🔍 Initializing prices for ${allItems.length} items`);

    this.fetchAndCachePrices(allItems).subscribe({
      next: (cachedItemsCount) => {
        this.isInitialized$.next(true);
        console.log(`✅ Initialized prices for ${cachedItemsCount} items`);
      },
      error: (error) => {
        console.error('Failed to initialize prices:', error);
        this.isInitialized$.next(true);
      }
    });
  }

  private generateItemsList(): string[] {
    const items: string[] = [];
    const tiers = ['T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
    const enchantLevels = [0, 1, 2, 3, 4]; // 0 = base, 1-4 = enchants

    // Combine all item maps
    const allMaps = {
      ...MATERIALS_MAP,
      ...WEAPONS_MAP,
      // ...ARMOR_MAP,
      // ...HEAD_MAP,
      // ...SHOES_MAP,
      // ...CAPE_MAP,
      // ...POTION_MAP,
      // ...FOOD_MAP,
      // ...MOUNT_MAP,
      // ...OFFHAND_MAP,
      // ...OTHER_MAP
    };

    Object.values(allMaps).forEach(baseName => {
      tiers.forEach(tier => {
        enchantLevels.forEach(enchantLevel => {
          if (enchantLevel === 0) {
            items.push(`${tier}_${baseName}`);
          } else {
            const isResource = Object.values(MATERIALS_MAP).includes(baseName);

            if (isResource) {
              items.push(`${tier}_${baseName}_LEVEL${enchantLevel}@${enchantLevel}`);
            } else {
              items.push(`${tier}_${baseName}@${enchantLevel}`);
            }
          }
        });
      });
    });

    return items;
  }

  /**
   * Single method responsible for fetching and caching prices
   * Checks cache first, only fetches missing items
   */
  private fetchAndCachePrices(itemIds: string[]): Observable<number> {
    const itemsToFetch = itemIds.filter(itemId => !this.pricesCache.has(itemId));

    if (itemsToFetch.length === 0) {
      console.log('📋 All items already cached, skipping fetch');
      return of(this.pricesCache.size);
    }

    if (itemsToFetch.length > 0) {
      console.log(`📦 Fetching ${itemsToFetch.length} missing items (${itemIds.length - itemsToFetch.length} already cached)`);
      console.log(itemsToFetch);
    }

    const chunks = this.chunkItems(itemsToFetch, this.MAX_QUERY_LENGTH);
    console.log(`🔄 Created ${chunks.length} API request chunks`);

    const requests = chunks.map(chunk =>
      this.fetchPricesChunk(chunk).pipe(
        catchError(error => {
          console.error('Error fetching price chunk:', error);
          return of([]);
        })
      )
    );

    return forkJoin(requests.length > 0 ? requests : [of([])]).pipe(
      map(results => {
        const allPrices = results.flat();
        this.updateCache(allPrices);
        return this.pricesCache.size;
      })
    );
  }

  /**
   * Single method responsible for updating cache
   * Only this method writes to pricesCache
   */
  private updateCache(apiPrices: PriceEntry[]): void {
    const groupedPrices = new Map<string, PriceEntry[]>();

    apiPrices.forEach(apiPrice => {
      const priceEntry = apiPrice as PriceEntry;

      if (!groupedPrices.has(apiPrice.item_id)) {
        groupedPrices.set(apiPrice.item_id, []);
      }
      groupedPrices.get(apiPrice.item_id)!.push(priceEntry);
    });

    groupedPrices.forEach((prices, itemId) => {
      this.pricesCache.set(itemId, prices);
    });

    console.log(`💾 Updated cache with ${groupedPrices.size} new items (total: ${this.pricesCache.size})`);
  }

  private fetchPricesChunk(items: string[]): Observable<PriceEntry[]> {
    const itemsParam = items.join(',');
    const url = `${this.API_BASE_URL}/${itemsParam}`;

    return this.http.get<PriceEntry[]>(url).pipe(
      map(response => response || [])
    );
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

  private isResourceItem(itemId: string): boolean {
    return this.materialNames.some(pattern => itemId.includes(pattern));
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

        this.fetchAndCachePrices([apiId]).subscribe();
        return [];
      })
    );
  }

  isInitialized(): Observable<boolean> {
    return this.isInitialized$.asObservable();
  }

  getAllPossibleItems(): string[] {
    return this.generateItemsList();
  }
}
