import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnchantmentEntry } from '../../data-types/albion-data';
import {RecipeListComponent} from "../recipe-list/recipe-list.component";

@Component({
  selector: 'app-enchant-list',
  standalone: true,
  imports: [CommonModule, RecipeListComponent],
  templateUrl: './enchant-list.component.html',
})
export class EnchantListComponent {
  @Input() enchantments: EnchantmentEntry[] = [];
  @Input() weaponName = '';
}
