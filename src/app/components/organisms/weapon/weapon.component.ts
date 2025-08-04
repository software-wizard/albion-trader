import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Weapon} from '../../../data-types/albion-data';
import {CraftRecipeComponent} from "../../molecules/craft-recipe/craft-recipe.component";
import {EnchantRecipeComponent} from "../../molecules/enchant-recipe.component/enchant-recipe.component";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, EnchantRecipeComponent],
  templateUrl: './weapon.component.html',
})
export class WeaponComponent {
  @Input() weapon!: Weapon;
  protected readonly JSON = JSON;
}
