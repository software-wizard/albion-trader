import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AlbionItemsService } from '../../../services/item-static-data-service';
import { AlbionStaticData, Weapon } from '../../../../assets/albion-static-data';
import { WeaponSubTypeComponent } from './weapon-sub-type.component';
import {PriceService} from "../../../services/price-service";
import {of} from "rxjs";
import plankData0 from "../../molecules/weapon/t40-plank-mock.json";
import metalbarData0 from "../../molecules/weapon/t40-metal-bar-mock.json";
import mainAxeData0 from "../../molecules/weapon/t40-main-axe-mock.json";
import plankData from "../../molecules/weapon/t41-plank-mock.json";
import metalbarData from "../../molecules/weapon/t41-metal-bar-mock.json";
import mainAxeData from "../../molecules/weapon/t41-main-axe-mock.json";

function filterAxeWeapons(ds: AlbionStaticData): Weapon[] {
  if (Array.isArray(ds?.weapon)) {
    return ds.weapon.filter(w => w.shopsubcategory2 === 'axe_main_axe');
  }
  return [];
}

@Component({
  standalone: true,
  selector: 'story-weapon-category-wrapper',
  imports: [CommonModule, WeaponSubTypeComponent],
  template: `
    <ng-container *ngIf="weapons().length > 0; else loading">
      <app-weapon-sub-type
        [weapons]="weapons()"
        categoryName="Main Axe">
      </app-weapon-sub-type>
    </ng-container>
    <ng-template #loading>Loading…</ng-template>
  `,
})
class StoryWeaponCategoryWrapper implements OnInit {
  private svc = inject(AlbionItemsService);
  weapons = signal<Weapon[]>([]);

  ngOnInit() {
    this.svc.loadItems().subscribe(ds => {
      const axeWeapons = filterAxeWeapons(ds);
      this.weapons.set(axeWeapons);
      console.log(`Loaded ${axeWeapons.length} axe weapons`);
    });
  }
}

export default {
  title: 'Organism/WeaponCategoryComponent',
  component: StoryWeaponCategoryWrapper,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        {
          provide: PriceService,
          useValue: {
            getPrices: (name: string) => {
              return of([]);
            },
          },
        },
      ],
    }),
  ],
} as Meta<StoryWeaponCategoryWrapper>;

type Story = StoryObj<StoryWeaponCategoryWrapper>;

export const AxeWeapons: Story = {};
