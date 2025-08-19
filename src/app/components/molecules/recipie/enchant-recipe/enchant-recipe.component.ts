import {Component, Input, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftRecipeComponent} from "../craft-recipe/craft-recipe.component";
import {Enchantment} from "../../../../../assets/albion-static-data";

@Component({
  selector: 'app-enchant-recipe',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent],
  templateUrl: './enchant-recipe.component.html',
})
export class EnchantRecipeComponent {
  @Input() enchant!: Enchantment;
  selectedResourceSignals: WritableSignal<number>[] = [];

  constructor() {
    this.prepareSignals()
  }

  prepareSignals() {
    // to powinno trafić do mapy. Może być wiele recept dla jednego enchantu.
    // powinno być w ng change
    for (let i = 0; i < 2; i++) {
      this.selectedResourceSignals.push(signal(0));
    }
  }
}
