import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CraftResource} from "../../../data-types/albion-data";
import {IconComponent} from "../../atoms/icon/icon.component";
import {LabelComponent} from "../../atoms/label/label.component";

@Component({
  selector: 'app-craft-resource',
  standalone: true,
  imports: [CommonModule, IconComponent, LabelComponent],
  templateUrl: './craft-resource.component.html',
  styleUrls: ['./craft-resource.component.scss']
})
export class CraftResourceComponent {
  @Input() craftResource!: CraftResource;
}
