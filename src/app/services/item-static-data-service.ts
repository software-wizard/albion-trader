// services/albion-items.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AlbionData} from "../data-types/albion-data";

@Injectable({providedIn: 'root'})
export class AlbionItemsService {
  constructor(private http: HttpClient) {
  }

  loadItems(): Observable<AlbionData> {
    return this.http.get<any>('/assets/items.json').pipe(
      map(data => {
        const toReturn = this.normalizeKeys(data.items);
        return toReturn as AlbionData;
      }))
  };

  normalizeKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(e => this.normalizeKeys(e));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        const cleanKey = key.replace(/^@/, '');
        let value = this.normalizeKeys(obj[key]);

        // Normalizacja konkretnych kluczy, jeśli nie są tablicą
        if ((cleanKey === 'craftingrequirements' || cleanKey === 'craftresource' || cleanKey === 'upgraderesource') && !Array.isArray(value)) {
          value = [value];
        }

        // UWAGA: enchantments.enchantment może być obiektem (rzadko), więc warto zabezpieczyć
        if (cleanKey === 'enchantment' && !Array.isArray(value)) {
          value = [value];
        }

        newObj[cleanKey] = value;
      }
      return newObj;
    }
    return obj;
  }

}
