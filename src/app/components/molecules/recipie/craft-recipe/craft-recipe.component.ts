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
  @Input() totalResourcesCostSignal: WritableSignal<number> = signal(0);
  resourcePricesSignal: WritableSignal<number>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['craftingrequirement']) {
      this.resourcePricesSignal = [];
      for (let i = 0; i < this.craftingrequirement.craftresource.length; i++) {
        this.resourcePricesSignal.push(signal(0));
      }
    }
  }

  updateResourcesCost() {
    if (!this.craftingrequirement || this.resourcePricesSignal.length === 0) return;

    let buffer = 0;
    for (let i = 0; i < this.craftingrequirement.craftresource.length; i++) {
      if (this.resourcePricesSignal[i]) {
        buffer += parseInt(this.craftingrequirement.craftresource[i].count) * this.resourcePricesSignal[i]();
      }
    }
    this.totalResourcesCostSignal.set(buffer)
  }

  priceChangedManually(index: number, $event: number) {
    this.resourcePricesSignal[index].set($event);
    this.updateResourcesCost();
  }

  getTotalResourceCost(index: number): number {
    const price = this.resourcePricesSignal[index]();
    const count = parseInt(this.craftingrequirement.craftresource[index].count);
    return price * count;
  }
}
