import {Component, Input, OnChanges, SimpleChanges, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CraftResource} from "../../../../../assets/albion-static-data";
import {IconComponent} from "../../../atoms/icon/icon.component";
import {LabelComponent} from "../../../atoms/label/label.component";
import {PriceDisplayComponent} from "../../price-display/price-display.component";
import {ItemQuality, PriceEntry, PriceType} from "../../../../data-types/albion-price-data";
import {PriceService} from "../../../../services/price-service";

@Component({
  selector: 'app-craft-resource',
  standalone: true,
  imports: [CommonModule, IconComponent, LabelComponent, PriceDisplayComponent],
  templateUrl: './craft-resource.component.html',
  styleUrls: ['./craft-resource.component.scss']
})
export class CraftResourceComponent implements OnChanges {
  @Input() craftResource!: CraftResource;
  @Input() resourcePrice!: WritableSignal<number>
  resourcePrices: PriceEntry[] = [];
  protected readonly PriceType = PriceType;

  constructor(private pricesService: PriceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['craftResource']?.currentValue?.uniquename) {
      this.pricesService.getPrices(this.craftResource.uniquename)
        .subscribe(prices => this.resourcePrices = prices);
    }
  }
}
