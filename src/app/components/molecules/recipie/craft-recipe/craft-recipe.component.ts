import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftResourceComponent} from "../craft-resource/craft-resource.component";
import {CraftingRequirements} from "../../../../../assets/albion-static-data";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, CraftResourceComponent],
  templateUrl: './craft-recipe.component.html',
  styleUrls: ['./craft-recipe.component.scss']
})
export class CraftRecipeComponent {
  @Input() craftingrequirement!: CraftingRequirements;
}
