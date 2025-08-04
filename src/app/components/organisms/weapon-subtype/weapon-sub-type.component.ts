import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Weapon} from '../../../data-types/albion-data';
import {CraftRecipeComponent} from "../../molecules/craft-recipe/craft-recipe.component";
import {EnchantRecipeComponent} from "../../molecules/enchant-recipe/enchant-recipe.component";
import {IconComponent} from "../../atoms/icon/icon.component";
import {SeparatorComponent} from "../../atoms/separator/separator.component";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, EnchantRecipeComponent, IconComponent, SeparatorComponent],
  templateUrl: './weapon-sub-type.component.html',
})
export class WeaponSubTypeComponent {
  @Input() weapon!: Weapon;
}
