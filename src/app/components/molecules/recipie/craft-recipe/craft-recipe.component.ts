import {Component, Input, OnChanges, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftResourceComponent} from "../craft-resource/craft-resource.component";
import {CraftingRequirements} from "../../../../../assets/albion-static-data";
import {InputComponent} from "../../../atoms/input/input.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, CraftResourceComponent, InputComponent],
  templateUrl: './craft-recipe.component.html',
  styleUrls: ['./craft-recipe.component.scss']
})
export class CraftRecipeComponent {
  @Input() craftingrequirement!: CraftingRequirements;
  @Input() resourcesPrices: WritableSignal<number>[] = [];

  getResourcesPrice() {
    let buffer = 0;
    for (let i = 0; i < this.craftingrequirement.craftresource.length; i++) {
      buffer += parseInt(this.craftingrequirement.craftresource[i].count) * this.resourcesPrices[i]();
    }
    return buffer;
  }

  priceChangedManually(index: number, $event: number) {
    this.resourcesPrices[index].set($event);
  }
}
