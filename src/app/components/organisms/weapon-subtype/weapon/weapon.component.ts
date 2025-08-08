import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnchantRecipeComponent} from "../enchant-recipe/enchant-recipe.component";
import {CraftRecipeComponent} from "../../../molecules/craft-recipe/craft-recipe.component";
import {IconComponent} from "../../../atoms/icon/icon.component";
import {SeparatorComponent} from "../../../atoms/separator/separator.component";
import {Weapon} from "../../../../../assets/data-structure";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, EnchantRecipeComponent, IconComponent, SeparatorComponent],
  templateUrl: './weapon.component.html',
})
export class WeaponComponent {
  @Input() weapon!: Weapon;
  protected readonly JSON = JSON;
}
