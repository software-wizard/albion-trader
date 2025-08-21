import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AlbionItemsService } from '../../../services/item-static-data-service';
import { AlbionStaticData, Weapon } from '../../../../assets/albion-static-data';
import { WeaponSubTypeCategory1Component } from './weapon-sub-type-category1.component';

function filterAxeWeapons(ds: AlbionStaticData): Weapon[] {
  if (Array.isArray(ds?.weapon)) {
    return ds.weapon.filter(w => w.shopsubcategory1 === 'axe');
  }
  return [];
}

@Component({
  standalone: true,
  selector: 'story-weapon-category-wrapper',
  imports: [CommonModule, WeaponSubTypeCategory1Component],
  template: `
    <ng-container *ngIf="weapons().length > 0; else loading">
      <app-weapon-sub-type-category1
        [weapons]="weapons()"
        categoryName="Axe">
      </app-weapon-sub-type-category1>
    </ng-container>
    <ng-template #loading>Loading…</ng-template>
  `,
})
class StoryWeaponSubTypeCategory1Component implements OnInit {
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
  title: 'Organism/WeaponSubTypeCategory1Component',
  component: StoryWeaponSubTypeCategory1Component,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
      ],
    }),
  ],
} as Meta<StoryWeaponSubTypeCategory1Component>;

type Story = StoryObj<StoryWeaponSubTypeCategory1Component>;

export const AxeWeapons: Story = {};
