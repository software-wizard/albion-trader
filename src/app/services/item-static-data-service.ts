import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AlbionStaticData} from "../data-types/albion-static-data";

@Injectable({providedIn: 'root'})
export class AlbionItemsService {
  constructor(private http: HttpClient) {
  }

  loadItems(): Observable<AlbionStaticData> {
    return this.http.get<any>('/assets/items.json').pipe(
      map(data => {
        const toReturn = this.normalizeKeys(data.items);
        return toReturn as AlbionStaticData;
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

        if ((cleanKey === 'craftingrequirements' || cleanKey === 'craftresource' || cleanKey === 'upgraderesource') && !Array.isArray(value)) {
          value = [value];
        }

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
