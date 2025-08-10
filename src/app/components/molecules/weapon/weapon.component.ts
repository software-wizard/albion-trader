import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftRecipeComponent} from "../recipie/craft-recipe/craft-recipe.component";
import {IconComponent} from "../../atoms/icon/icon.component";
import {Weapon} from "../../../../assets/albion-static-data";
import {SeparatorComponent} from "../../atoms/separator/separator.component";
import {EnchantRecipeComponent} from "../recipie/enchant-recipe/enchant-recipe.component";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, IconComponent, SeparatorComponent, EnchantRecipeComponent],
  templateUrl: './weapon.component.html',
})
export class WeaponComponent implements OnChanges {
  @Input() weapon!: Weapon;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weapon']?.currentValue) {
      console.log(this.weapon)
    }
  }
}
