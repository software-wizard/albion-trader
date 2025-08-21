import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Weapon } from '../../../../assets/albion-static-data';
import { WeaponComponent } from '../../molecules/weapon/weapon.component';

@Component({
  selector: 'app-weapon-sub-type',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, WeaponComponent],
  templateUrl: './weapon-sub-type.component.html',
  styleUrls: ['./weapon-sub-type.component.scss']
})
export class WeaponSubTypeComponent {
  @Input() weapons: Weapon[] = [];
  @Input() categoryName: string = '';
}
