import {Component, Input, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftRecipeComponent} from "../craft-recipe/craft-recipe.component";
import {Enchantment} from "../../../../../assets/albion-static-data";
import {SeparatorComponent, SeparatorStyle} from "../../../atoms/separator/separator.component";

@Component({
  selector: 'app-enchant-recipe',
  standalone: true,
  imports: [CommonModule, CraftRecipeComponent, SeparatorComponent],
  templateUrl: './enchant-recipe.component.html',
})
export class EnchantRecipeComponent {
  @Input() enchant!: Enchantment;
  @Input() totalResourcesCostSignal!: WritableSignal<number>;
  protected readonly SeparatorStyle = SeparatorStyle;
}
