import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {AlbionItemsService} from "../../services/item-static-data-service";
import {AlbionData, Weapon} from "../../data-types/albion-data";
import {WeaponComponent} from "../../components/molecules/weapon/weapon.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, WeaponComponent],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  dataEntries?: AlbionData;

  constructor(private itemsService: AlbionItemsService) {
  }

  async ngOnInit(): Promise<void> {
    this.dataEntries = await firstValueFrom(this.itemsService.loadItems());
  }

  hasEnchantments(item: Weapon): boolean {
    return !!item.enchantments?.enchantment?.length;
  }

}
