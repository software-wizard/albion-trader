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
  @Input() selectedPriceSignal!: WritableSignal<number>;
  @Input() inTwoRows: boolean = false;
  readonly citiesOrder = [
    City.FortSterling, City.Lymhurst, City.Bridgewatch, City.Martlock, City.Thetford, City.BlackMarket,
  ];
  protected readonly cityColors = cityColors;
  protected cells?: TableCell[];
  protected selectedCity?: City;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prices'] || changes['displayType']) {
      this.cells = this.updateTable();
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
    this.selectedPriceSignal.set(this.getPriceForSelectedCity())
  }

  getPriceForSelectedCity(): number {
    const city = this.citiesOrder.find(city => city === this.selectedCity);
    return this.cells!.find(r => r.city === city)!.price;
  }
}
