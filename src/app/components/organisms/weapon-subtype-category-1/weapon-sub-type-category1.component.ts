import {Component, Input, OnChanges, SimpleChanges, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {Weapon} from '../../../../assets/albion-static-data';
import {WeaponSubTypeComponent} from "../weapon-subtype/weapon-sub-type.component";

interface WeaponSubcategory {
  name: string;
  weapons: Weapon[];
  count: number;
}

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

  subcategories = signal<WeaponSubcategory[]>([]);
  isExpanded = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weapons']) {
      this.groupWeaponsBySubcategory();
    }
  }

  private groupWeaponsBySubcategory(): void {
    const subcategoryMap = new Map<string, Weapon[]>();

    this.weapons.forEach(weapon => {
      const subcategory = weapon.shopsubcategory2 || 'Basic';
      if (!subcategoryMap.has(subcategory)) {
        subcategoryMap.set(subcategory, []);
      }
      subcategoryMap.get(subcategory)!.push(weapon);
    });

    const subcategories: WeaponSubcategory[] = Array.from(subcategoryMap.entries())
      .map(([name, weapons]) => ({
        name,
        weapons,
        count: weapons.length
      }))
      .sort((a, b) => b.count - a.count);

    this.subcategories.set(subcategories);
    console.log(`📋 ${this.categoryName}: ${this.weapons.length} weapons in ${subcategories.length} subcategories`);
  }

  onExpansionToggle(expanded: boolean): void {
    this.isExpanded.set(expanded);
    if (expanded) {
      console.log(`🔄 Showing ${this.subcategories().length} subcategories for ${this.categoryName} (NO weapon components yet)`);
    } else {
      console.log(`📴 Collapsed ${this.categoryName}`);
    }
  }

  trackBySubcategory(index: number, subcategory: WeaponSubcategory): string {
    return subcategory.name;
  }
}
