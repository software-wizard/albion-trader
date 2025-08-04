import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftResourceRequirements} from '../../../data-types/albion-data';
import {RecipeEntryComponent} from "../../atoms/recipe-entry/recipe-entry.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RecipeEntryComponent],
  templateUrl: './craft-recipe.component.html',
})
export class CraftRecipeComponent {
  @Input() craftingrequirement!: CraftResourceRequirements;
  protected readonly JSON = JSON;
}
