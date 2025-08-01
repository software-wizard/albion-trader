import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ApiPriceEntry {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number;
  buy_price_max: number;
}

@Injectable({ providedIn: 'root' })
export class OreRefiningMockService {
  getOrePrices(): Observable<ApiPriceEntry[]> {
    const mock: ApiPriceEntry[] = [
      { item_id: 'T4_ORE', city: 'Bridgewatch', quality: 0, sell_price_min: 120, buy_price_max: 110 },
      { item_id: 'T4_ORE', city: 'Martlock', quality: 0, sell_price_min: 125, buy_price_max: 115 },
      { item_id: 'T5_ORE', city: 'Bridgewatch', quality: 0, sell_price_min: 240, buy_price_max: 230 },
    ];
    return of(mock);
  }
}
