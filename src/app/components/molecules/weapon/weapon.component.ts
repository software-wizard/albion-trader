import {Component, Input, OnChanges, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftRecipeComponent} from "../recipie/craft-recipe/craft-recipe.component";
import {Weapon} from "../../../../assets/albion-static-data";
import {SeparatorComponent} from "../../atoms/separator/separator.component";
import {EnchantRecipeComponent} from "../recipie/enchant-recipe/enchant-recipe.component";
import {PriceService} from "../../../services/price-service";
import {PriceEntry, PriceType} from "../../../data-types/albion-price-data";
import {InputComponent} from "../../atoms/input/input.component";
import {ItemPriceDisplayComponent} from "../item-price-display/item-price-display.component";
import {IconComponent} from "../../atoms/icon/icon.component";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, SeparatorComponent, EnchantRecipeComponent, InputComponent, ItemPriceDisplayComponent, IconComponent],
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent implements OnChanges {
  @Input() weapon!: Weapon;
  weaponPrices: Map<string, PriceEntry[]> = new Map<string, PriceEntry[]>();
  selectedPrices: Map<number, WritableSignal<number>[]> = new Map(
    Array.from({length: 5}, (_, i) => [
      i,
      Array.from({length: 5}, () => signal(0))
    ])
  );

  constructor(private pricesService: PriceService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weapon']?.currentValue) {
      this.pricesService.getPrices(this.weapon.uniquename)
        .subscribe(prices => this.weaponPrices.set(this.weapon.uniquename, prices));

      for (let i = 1; i <= 4; i++) {
        let enchantName = `${this.weapon.uniquename}@${i}`;
        this.pricesService.getPrices(enchantName)
          .subscribe(prices => this.weaponPrices.set(enchantName, prices));
      }
    }
  }

  getProfit(enchant: number, quality: number){
    this.selectedPrices.get(enchant)![quality]()
  }

  protected readonly PriceType = PriceType;
  protected readonly parseInt = parseInt;
}
