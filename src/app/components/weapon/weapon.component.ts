import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Weapon} from '../../data-types/albion-data';
import {RecipeListComponent} from "../recipe-list/recipe-list.component";
import {EnchantListComponent} from "../enchant-list/enchant-list.component";

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [CommonModule, RecipeListComponent, EnchantListComponent],
  templateUrl: './weapon.component.html',
})
export class WeaponComponent {
  @Input() weapon!: Weapon;
}
