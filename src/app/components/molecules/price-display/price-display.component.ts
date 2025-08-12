import {Component, Input, OnChanges, SimpleChanges, WritableSignal} from '@angular/core';
import {City, cityColors, PriceEntry, PriceType} from '../../../data-types/albion-price-data';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

interface TableCell {
  city: City;
  price: number;
  date: string | number;
}

@Component({
  selector: 'app-price-display',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.scss']
})
export class PriceDisplayComponent implements OnChanges {
  @Input() prices!: PriceEntry[];
  @Input() displayType!: PriceType;
  @Input() resourcePrice!: WritableSignal<number>;

  readonly citiesOrder = [
    City.FortSterling, City.Lymhurst, City.Bridgewatch, City.Martlock, City.Thetford, City.BlackMarket,
  ];
  protected readonly cityColors = cityColors;
  protected cities?: TableCell[];
  protected selectedCity?: City;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prices'] || changes['visibleQualities'] || changes['displayType']) {
      this.cities = this.updateTable();
      this.computeSelectedCellValue();
    }
  }

  updateTable(): TableCell[] {
    return this.citiesOrder.map(city => {
      const entry = this.prices.find(d => d.city === city);
      const value = entry?.[this.displayType] ?? 0;
      const dateKey = (this.displayType + '_date') as keyof PriceEntry;
      const date = entry?.[dateKey] ?? '';
      return {city, price: value, date};
    });
  }

  onCellClick(city: City): void {
    this.selectedCity = city;
    this.resourcePrice.set(this.computeSelectedCellValue())
  }

  computeSelectedCellValue(): number {
    const city = this.citiesOrder.find(city => city === this.selectedCity);
    return this.cities!.find(r => r.city === city)!.price;
  }
}
