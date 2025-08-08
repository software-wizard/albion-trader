import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CraftResourceRequirements} from '../../../data-types/albion-static-data';
import {CraftResourceComponent} from "./craft-resource/craft-resource.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, CraftResourceComponent],
  templateUrl: './craft-recipe.component.html',
  styleUrls: ['./craft-recipe.component.scss']
})
export class CraftRecipeComponent {
  @Input() craftingrequirement!: CraftResourceRequirements;
}
