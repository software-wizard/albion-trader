import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AlbionItemsService } from '../../../services/item-static-data-service';
import { AlbionStaticData, Weapon } from '../../../../assets/albion-static-data';
import { WeaponSubTypeComponent } from './weapon-sub-type.component';

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
        categoryName="Axe">
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
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
} as Meta<StoryWeaponCategoryWrapper>;

type Story = StoryObj<StoryWeaponCategoryWrapper>;

export const AxeWeapons: Story = {};
