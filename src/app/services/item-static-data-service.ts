// services/albion-items.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AlbionData, Weapon} from "../data-types/albion-data";

@Injectable({providedIn: 'root'})
export class AlbionItemsService {
  constructor(private http: HttpClient) {
  }

  loadItems(): Observable<AlbionData> {
    return this.http.get<any>('/assets/items.json').pipe(
      map(data => {
        // console.log(data.weapon.map((w: Weapon) => w.uniquename))

        const x = this.normalizeKeys(data.items);
        console.log(x.weapon.map((w: Weapon) => w.uniquename))
        return x as AlbionData;
      }))
  };

  normalizeKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(e => this.normalizeKeys(e));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        const cleanKey = key.replace(/^@/, '');
        const normalizedValue = this.normalizeKeys(obj[key]);

        if (cleanKey === 'craftingrequirements' && !Array.isArray(normalizedValue)) {
          newObj[cleanKey] = [normalizedValue];
        } else {
          newObj[cleanKey] = normalizedValue;
        }
      }
      return newObj;
    }
    return obj;
  }
}
