import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CraftResource} from "../../../data-types/albion-data";

@Component({
  selector: 'app-recipe-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-entry.component.html',
})
export class RecipeEntryComponent {
  @Input() craftResource!: CraftResource;
}
