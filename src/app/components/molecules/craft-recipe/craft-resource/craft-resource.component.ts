import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CraftResource} from "../../../../data-types/albion-static-data";
import {IconComponent} from "../../../atoms/icon/icon.component";
import {LabelComponent} from "../../../atoms/label/label.component";
import {PriceDisplayComponent} from "../../price-display/price-display.component";
import {ItemQuality, PriceEntry, PriceType} from "../../../../data-types/albion-price-data";

@Component({
  selector: 'app-craft-resource',
  standalone: true,
  imports: [CommonModule, IconComponent, LabelComponent, PriceDisplayComponent],
  templateUrl: './craft-resource.component.html',
  styleUrls: ['./craft-resource.component.scss']
})
export class CraftResourceComponent {
  @Input() craftResource!: CraftResource;
  @Input() resourcePrices!: PriceEntry[];
  protected readonly ItemQuality = ItemQuality;
  protected readonly PriceType = PriceType;
}
