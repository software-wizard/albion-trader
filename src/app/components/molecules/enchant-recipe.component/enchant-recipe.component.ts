import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnchantmentEntry} from '../../../data-types/albion-data';
import {CraftRecipeComponent} from "../craft-recipe/craft-recipe.component";

@Component({
  selector: 'app-enchant-recipe',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent],
  templateUrl: './enchant-recipe.component.html',
})
export class EnchantRecipeComponent {
  @Input() enchantment!: EnchantmentEntry;
  protected readonly JSON = JSON;
}
