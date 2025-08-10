import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {PriceEntry} from "../data-types/albion-price-data";

@Injectable({ providedIn: 'root' })
export class PricesService {
  getPrices(uniqueName: string): Observable<PriceEntry[]> {
    return of([]);
  }
}
