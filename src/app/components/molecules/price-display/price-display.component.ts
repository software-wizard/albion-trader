import {Component, Input} from '@angular/core';
import {City, cityColors, ItemQuality, PriceEntry, PriceType} from '../../../data-types/albion-price-data';
import {CommonModule} from "@angular/common";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-price-display',
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule]
})
export class PriceDisplayComponent {
  @Input() data!: PriceEntry[];
  @Input() displayType!: PriceType;

  readonly qualities = [
    ItemQuality.Normal,
    ItemQuality.Good,
    ItemQuality.Outstanding,
    ItemQuality.Excellent,
    ItemQuality.Masterpiece,
  ];

  readonly citiesOrder = [
    City.FortSterling,
    City.Thetford,
    City.Martlock,
    City.Bridgewatch,
    City.Lymhurst,
    City.BlackMarket,
    City.Brecilien,
  ];

  get rows() {
    return this.citiesOrder.map(city => ({
      city,
      bg: cityColors[city],
      values: this.qualities.map(quality => {
        const entry = this.data.find(d => d.city === city && d.quality === quality);
        const value = entry?.[this.displayType] ?? 0;
        const dateKey = (this.displayType + '_date') as keyof PriceEntry;
        const date = entry?.[dateKey] ?? '';
        return {value, date};
      }),
    }));
  }
}
