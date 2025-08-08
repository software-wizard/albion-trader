import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {City, cityColors, ItemQuality, PriceEntry, PriceType} from '../../../data-types/albion-price-data';
import {CommonModule} from "@angular/common";
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-price-display',
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule]
})
export class PriceDisplayComponent implements OnChanges {
  @Input() data!: PriceEntry[];
  @Input() displayType!: PriceType;
  @Input() visibleQualities: ItemQuality[] = [
    ItemQuality.Normal,
    ItemQuality.Good,
    ItemQuality.Outstanding,
    ItemQuality.Excellent,
    ItemQuality.Masterpiece,
  ];

  readonly qualities = [
    ItemQuality.Normal,
    ItemQuality.Good,
    ItemQuality.Outstanding,
    ItemQuality.Excellent,
    ItemQuality.Masterpiece,
  ];

  readonly citiesOrder = [
    City.FortSterling,
    City.Lymhurst,
    City.Bridgewatch,
    City.Martlock,
    City.Thetford,
    City.BlackMarket,
  ];

  protected readonly cityColors = cityColors;
  parsedTable?: { quality: ItemQuality; values: { city: City; value: number; date: string | number; }[]; }[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.parsedTable = this.updateTable();
    }
  }

  updateTable() {
    return this.qualities
      .filter(q => this.visibleQualities.includes(q))
      .map(quality => ({
        quality,
        values: this.citiesOrder.map(city => {
          const entry = this.data.find(d => d.city === city && d.quality === quality);
          const value = entry?.[this.displayType] ?? 0;
          const dateKey = (this.displayType + '_date') as keyof PriceEntry;
          const date = entry?.[dateKey] ?? '';
          return {city, value, date};
        }),
      }));
  }

  getTableForSingleQuality(): { values: { city: City; value: number; date: string | number }[] }[] {
    const flat = this.parsedTable!.flatMap(r => r.values);
    const chunked: { city: City; value: number; date: string | number }[][] = [];

    for (let i = 0; i < flat.length; i += 3) {
      chunked.push(flat.slice(i, i + 3));
    }

    return chunked.map(chunk => ({ values: chunk }));
  }
}
