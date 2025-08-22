import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Weapon } from '../../../../assets/albion-static-data';
import { WeaponComponent } from '../../molecules/weapon/weapon.component';

@Component({
  selector: 'app-weapon-sub-type',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ScrollingModule, WeaponComponent],
  templateUrl: './weapon-sub-type.component.html',
  styleUrls: ['./weapon-sub-type.component.scss']
})
export class WeaponSubTypeComponent {
  @Input() weapons: Weapon[] = [];
  @Input() categoryName: string = '';

  isExpanded = signal(false);

  onExpansionToggle(expanded: boolean): void {
    this.isExpanded.set(expanded);
    if (expanded) {
      console.log(`🗡️ NOW creating ${this.weapons.length} WeaponComponents for ${this.categoryName}`);
    } else {
      console.log(`📴 Collapsed ${this.categoryName} subcategory`);
    }
  }

  trackByWeapon(index: number, weapon: Weapon): string {
    return weapon.uniquename;
  }
}
