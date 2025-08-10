import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PriceEntry} from "../data-types/albion-price-data";

export const BASE_MAP: Record<string, string> = {
  ore: 'ORE',
  fiber: 'FIBER',
  hide: 'HIDE',
  cloth: 'CLOTH',
  leather: 'LEATHER',
  plank: 'PLANKS',
  metal_bar: 'METALBAR',
  stone_block: 'STONEBLOCK'
};

@Injectable({providedIn: 'root'})
export class PriceService {


  static internalToApiId(id: string): string {
    if (/(?:^|_)(?:METALBAR|PLANKS)(?:_|$)/.test(id) && !/@\d+$/.test(id)) {
      const m = id.match(/_LEVEL(\d+)/);
      if (m) return id + '@' + m[1];
    }
    return id;
  }

  getPrices(uniqueName: string): Observable<PriceEntry[]> {
    return of([]);
  }
}
