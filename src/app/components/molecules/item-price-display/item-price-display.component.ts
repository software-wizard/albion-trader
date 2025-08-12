import {Component, Input, OnChanges, SimpleChanges, WritableSignal} from '@angular/core';
import {City, cityColors, ItemQuality, PriceEntry, PriceType} from '../../../data-types/albion-price-data';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InputComponent} from "../../atoms/input/input.component";

interface TableCell {
  city: City;
  value: number;
  date: string | number;
}

interface QualityRow {
  quality?: ItemQuality;
  values: TableCell[];
}

@Component({
  selector: 'app-price-display',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, InputComponent, InputComponent],
  templateUrl: './item-price-display.component.html',
  styleUrls: ['./item-price-display.component.scss']
})
export class ItemPriceDisplayComponent implements OnChanges {
  @Input() prices!: PriceEntry[];
  @Input() displayType!: PriceType;

  @Input() visibleQualities: ItemQuality[] = [
    ItemQuality.Normal, ItemQuality.Good, ItemQuality.Outstanding, ItemQuality.Excellent, ItemQuality.Masterpiece,
  ];

  readonly qualities = [
    ItemQuality.Normal, ItemQuality.Good, ItemQuality.Outstanding, ItemQuality.Excellent, ItemQuality.Masterpiece,
  ];

  readonly citiesOrder = [
    City.FortSterling, City.Lymhurst, City.Bridgewatch, City.Martlock, City.Thetford, City.BlackMarket,
  ];

  protected readonly cityColors = cityColors;
  protected parsedTable?: QualityRow[];
  protected singleQualityTable: QualityRow[] = [];
  protected selectedCities: Record<number, City> = {};
  inputValues: Record<number, number> = {};
  @Input() resourcePrice!: WritableSignal<number>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prices'] || changes['visibleQualities'] || changes['displayType']) {
      this.parsedTable = this.updateTable();
      this.singleQualityTable = this.computeSingleQualityTable();
      this.initInputs();
    }
  }

  updateTable(): QualityRow[] {
    return this.qualities
      .filter(q => this.visibleQualities.includes(q))
      .map(quality => ({
        quality,
        values: this.citiesOrder.map(city => {
          const entry = this.prices.find(d => d.city === city && d.quality === quality);
          const value = entry?.[this.displayType] ?? 0;
          const dateKey = (this.displayType + '_date') as keyof PriceEntry;
          const date = entry?.[dateKey] ?? '';
          return {city, value, date};
        }),
      }));
  }

  private computeSingleQualityTable(): QualityRow[] {
    const flat = this.parsedTable?.flatMap(r => r.values) ?? [];
    const chunked: TableCell[][] = [];
    for (let i = 0; i < flat.length; i += 3) chunked.push(flat.slice(i, i + 3));
    return chunked.map(chunk => ({values: chunk}));
  }

  onCellClick(rowIndex: number, city: City): void {
    this.selectedCities[rowIndex] = city;
    this.inputValues[rowIndex] = this.computeSelectedCellValue(rowIndex);
    this.resourcePrice.set(this.inputValues[rowIndex])
  }

  private initInputs(): void {
    if (this.visibleQualities.length === 1) {
      if (this.inputValues[0] == null) {
        this.inputValues[0] = this.computeSelectedCellValue(0);
      }
    } else {
      const rows = this.parsedTable?.length ?? 0;
      for (let i = 0; i < rows; i++) {
        if (this.inputValues[i] == null) this.inputValues[i] = this.computeSelectedCellValue(i);
      }
    }
  }

  computeSelectedCellValue(i: number): number {
    const city = this.selectedCities[i];
    if (this.visibleQualities.length === 1) {
      const flat = this.singleQualityTable.flatMap(r => r.values);
      return flat.find(c => c.city === city)?.value ?? 0;
    }
    const row = this.parsedTable?.[i];
    const cell = row?.values.find(c => c.city === city);
    return cell?.value ?? 0;
  }
}
