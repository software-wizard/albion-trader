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
export class CraftRecipeComponent implements OnChanges {
  @Input() craftingrequirement!: CraftingRequirements;
  resourcesPrice: WritableSignal<number>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['craftingrequirement']) {
      for (let i = 0; i < this.craftingrequirement.craftresource.length; i++) {
        this.resourcesPrice.push(signal(0))
      }
    }
  }

  getResourcesPrice() {
    let buffer = 0;
    for (let i = 0; i < this.craftingrequirement.craftresource.length; i++) {
      buffer += parseInt(this.craftingrequirement.craftresource[i].count) * this.resourcesPrice[i]();
    }
    return buffer;
  }

  priceChangedManually(index: number, $event: number) {
    this.resourcesPrice[index].set($event);
  }
}
