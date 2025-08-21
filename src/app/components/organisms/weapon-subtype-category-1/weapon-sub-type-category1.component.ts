import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {Weapon} from '../../../../assets/albion-static-data';
import {WeaponSubTypeComponent} from "../weapon-subtype/weapon-sub-type.component";

@Component({
  selector: 'app-weapon-sub-type-category1',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, WeaponSubTypeComponent],
  templateUrl: './weapon-sub-type-category1.component.html',
  styleUrls: ['./weapon-sub-type-category1.component.scss']
})
export class WeaponSubTypeCategory1Component implements OnChanges {
  @Input() weapons: Weapon[] = [];
  @Input() categoryName: string = '';

  groupedWeapons: { subcategory: string, weapons: Weapon[] }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weapons']) {
      this.groupWeaponsBySubcategory();
    }
  }

  private groupWeaponsBySubcategory(): void {
    const groups = new Map<string, Weapon[]>();

    this.weapons.forEach(weapon => {
      const subcategory = weapon.shopsubcategory2 || 'unknown';
      if (!groups.has(subcategory)) {
        groups.set(subcategory, []);
      }
      groups.get(subcategory)!.push(weapon);
    });

    this.groupedWeapons = Array.from(groups.entries()).map(([subcategory, weapons]) => ({
      subcategory,
      weapons
    }));

    console.log(`Grouped ${this.weapons.length} weapons into ${this.groupedWeapons.length} subcategories`);
  }
}
