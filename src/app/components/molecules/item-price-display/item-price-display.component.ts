import {Component, Input, OnChanges, SimpleChanges, WritableSignal} from '@angular/core';
import {ItemQuality, PriceEntry, PriceType} from '../../../data-types/albion-price-data';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PriceDisplayComponent} from "../price-display/price-display.component";

@Component({
  selector: 'app-item-price-display',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, PriceDisplayComponent],
  templateUrl: './item-price-display.component.html',
  styleUrls: ['./item-price-display.component.scss']
})
export class ItemPriceDisplayComponent implements OnChanges {
  @Input() prices!: PriceEntry[];
  @Input() pricesMap: Map<number, PriceEntry[]> = new Map();
  @Input() displayType!: PriceType;
  @Input() selectedPricesPerQualitySignals!: WritableSignal<number>[];

  readonly qualities = [
    ItemQuality.Normal, ItemQuality.Good, ItemQuality.Outstanding, ItemQuality.Excellent, ItemQuality.Masterpiece,
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prices'] || changes['displayType']) {
      this.pricesMap = this.createQualityMap(this.prices);
    }
  }

  createQualityMap(entries: PriceEntry[]): Map<number, PriceEntry[]> {
    return entries.reduce((map, entry) => {
      if (!map.has(entry.quality)) {
        map.set(entry.quality, []);
      }
      map.get(entry.quality)!.push(entry);
      return map;
    }, new Map<number, PriceEntry[]>());
  }

  protected readonly PriceType = PriceType;
}
