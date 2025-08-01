import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CraftResource, CraftResourceRequirements} from '../../data-types/albion-data';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  @Input() craftingrequirements: CraftResourceRequirements[] = [];
}
