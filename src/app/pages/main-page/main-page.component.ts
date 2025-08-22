import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {AlbionItemsService} from "../../services/item-static-data-service";
import {AlbionStaticData, Weapon} from "../../../assets/albion-static-data";
import {
  WeaponSubTypeCategory1Component
} from "../../components/organisms/weapon-subtype-category-1/weapon-sub-type-category1.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, WeaponSubTypeCategory1Component],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  dataEntries?: AlbionStaticData;

  constructor(private itemsService: AlbionItemsService) {
  }

  async ngOnInit(): Promise<void> {
    console.log('🔄 Loading items...');
    this.dataEntries = await firstValueFrom(this.itemsService.loadItems());
    console.log('📦 Loaded data:', this.dataEntries);
    console.log('🗡️ Weapons count:', this.dataEntries?.weapon?.length);
    console.log('🔍 First weapon:', this.dataEntries?.weapon?.[0]);
  }

  hasEnchantments(item: Weapon): boolean {
    return !!item.enchantments?.enchantment?.length;
  }

}
