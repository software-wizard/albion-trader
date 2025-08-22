import {Component, Input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftRecipeComponent} from "../recipie/craft-recipe/craft-recipe.component";
import {Weapon} from "../../../../assets/albion-static-data";
import {SeparatorComponent, SeparatorStyle} from "../../atoms/separator/separator.component";
import {EnchantRecipeComponent} from "../recipie/enchant-recipe/enchant-recipe.component";
import {PriceService} from "../../../services/price-service";
import {PriceEntry, PriceType} from "../../../data-types/albion-price-data";
import {InputComponent} from "../../atoms/input/input.component";
import {ItemPriceDisplayComponent} from "../item-price-display/item-price-display.component";
import {IconComponent} from "../../atoms/icon/icon.component";
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, SeparatorComponent, EnchantRecipeComponent, InputComponent, ItemPriceDisplayComponent, IconComponent, MatCardModule, MatExpansionModule],
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent implements OnChanges, OnInit {
  @Input() weapon!: Weapon;
  apiWeaponPrices: Map<string, PriceEntry[]> = new Map<string, PriceEntry[]>();
  selectedPricesSignalMap: Map<number, WritableSignal<number>[]> = new Map(
    Array.from({length: 5}, (_, i) => [
      i,
      Array.from({length: 5}, () => signal(0))
    ])
  );
  totalResourcePrice: WritableSignal<number>[] = Array.from({length: 5}, () => signal(0));

  constructor(private pricesService: PriceService) {
  }

  ngOnInit() {
    console.log('🔫 WeaponComponent created for:', this.weapon.uniquename);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weapon']?.currentValue) {
      firstValueFrom(this.pricesService.getPrices(this.weapon.uniquename))
        .then(prices => this.apiWeaponPrices.set(this.weapon.uniquename, prices))
        .catch(error => console.error('Failed to get prices:', error));

      for (let i = 1; i <= 4; i++) {
        let enchantName = `${this.weapon.uniquename}@${i}`;
        firstValueFrom(this.pricesService.getPrices(enchantName))
          .then(prices => this.apiWeaponPrices.set(enchantName, prices));
      }
    }
  }

  getProfit(enchant: number, quality: number) {
    const priceSignal = this.selectedPricesSignalMap.get(enchant)?.[quality];
    const totalCostSignal = this.totalResourcePrice[enchant];

    if (!priceSignal || !totalCostSignal) {
      return 0;
    }

    return priceSignal() - totalCostSignal();
  }

  getProfitPercentage(enchant: number, index: number) {
    const profit = this.getProfit(enchant, index);
    const totalCost = this.totalResourcePrice[enchant]?.();

    if (!totalCost || totalCost === 0) {
      return 0;
    }

    const percentageProfit = (profit / totalCost) * 100;
    return Math.round(percentageProfit * 10) / 10;
  }
  protected readonly PriceType = PriceType;

  protected readonly parseInt = parseInt;
  protected readonly SeparatorStyle = SeparatorStyle;
}
