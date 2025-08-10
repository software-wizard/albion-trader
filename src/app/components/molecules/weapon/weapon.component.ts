import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftRecipeComponent} from "../recipie/craft-recipe/craft-recipe.component";
import {IconComponent} from "../../atoms/icon/icon.component";
import {Weapon} from "../../../../assets/albion-static-data";
import {SeparatorComponent} from "../../atoms/separator/separator.component";
import {EnchantRecipeComponent} from "../recipie/enchant-recipe/enchant-recipe.component";
import {PriceService} from "../../../services/price-service";
import {PriceEntry, PriceType} from "../../../data-types/albion-price-data";
import {PriceDisplayComponent} from "../price-display/price-display.component";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, IconComponent, SeparatorComponent, EnchantRecipeComponent, PriceDisplayComponent],
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent implements OnChanges {
  @Input() weapon!: Weapon;
  weaponPrices: Map<string, PriceEntry[]> = new Map<string, PriceEntry[]>();

  constructor(private pricesService: PriceService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weapon']?.currentValue) {
      this.pricesService.getPrices(this.weapon.uniquename)
        .subscribe(prices => this.weaponPrices.set(this.weapon.uniquename, prices));

      for (let i = 1; i < 5; i++) {
        let enchantName = `${this.weapon.uniquename}@${i}`;
        this.pricesService.getPrices(enchantName)
          .subscribe(prices => this.weaponPrices.set(enchantName, prices));
      }
    }
  }

  protected readonly PriceType = PriceType;
}
