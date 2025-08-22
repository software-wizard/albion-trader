import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {AlbionItemsService} from "../../services/item-static-data-service";
import {AlbionStaticData, Weapon} from "../../../assets/albion-static-data";
import {
  WeaponSubTypeCategory1Component
} from "../../components/organisms/weapon-subtype-category-1/weapon-sub-type-category1.component";

interface WeaponCategory {
  name: string;
  weapons: Weapon[];
  count: number;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, WeaponSubTypeCategory1Component],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  dataEntries?: AlbionStaticData;
  weaponCategories = signal<WeaponCategory[]>([]);
  isLoading = signal(true);

  constructor(private itemsService: AlbionItemsService) {}

  async ngOnInit(): Promise<void> {
    console.log('🔄 Loading items...');
    try {
      this.dataEntries = await firstValueFrom(this.itemsService.loadItems());
      console.log('📦 Loaded data:', this.dataEntries);
      console.log('🗡️ Weapons count:', this.dataEntries?.weapon?.length);

      if (this.dataEntries?.weapon) {
        this.processWeapons(this.dataEntries.weapon);
      }
    } catch (error) {
      console.error('Failed to load weapons:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private processWeapons(weapons: Weapon[]): void {
    const categoryMap = new Map<string, Weapon[]>();

    weapons.forEach(weapon => {
      const category = weapon.shopsubcategory1 || 'unknown';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(weapon);
    });

    const categories: WeaponCategory[] = Array.from(categoryMap.entries())
      .map(([name, weapons]) => ({
        name,
        weapons,
        count: weapons.length
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending

    this.weaponCategories.set(categories);
    console.log('📊 Processed categories:', categories.map(c => `${c.name}: ${c.count}`));
  }

  hasEnchantments(item: Weapon): boolean {
    return !!item.enchantments?.enchantment?.length;
  }
}
