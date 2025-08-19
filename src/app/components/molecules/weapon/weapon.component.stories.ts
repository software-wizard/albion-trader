import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';


import {AlbionItemsService} from '../../../services/item-static-data-service';
import {AlbionStaticData, Weapon} from '../../../../assets/albion-static-data';
import {WeaponComponent} from './weapon.component';
import {PriceService} from '../../../services/price-service';
import {of} from 'rxjs';
import plankData from './t41-plank-mock.json';
import metalbarData from './t41-metal-bar-mock.json';
import mainAxeData from './t41-main-axe-mock.json';

import plankData0 from './t40-plank-mock.json';
import metalbarData0 from './t40-metal-bar-mock.json';
import mainAxeData0 from './t40-main-axe-mock.json';


const WEAPON_NAME = 'T4_MAIN_AXE';

function pickWeapon(ds: AlbionStaticData): Weapon | null {
  if (Array.isArray(ds?.weapon)) {
    return ds.weapon.find(w => w.uniquename === WEAPON_NAME) ?? null;
  }
  return null;
}

@Component({
  standalone: true,
  selector: 'story-weapon-wrapper',
  imports: [CommonModule, WeaponComponent, MatCardModule],
  template: `
    <ng-container *ngIf="weapon(); else loading">
      <app-weapon [weapon]="weapon()!"></app-weapon>
    </ng-container>
    <ng-template #loading>Loading…</ng-template>
  `,
})
class StoryWeaponWrapper implements OnInit {
  private svc = inject(AlbionItemsService);
  weapon = signal<Weapon | null>(null);

  ngOnInit() {
    this.svc.loadItems().subscribe(ds => {
      this.weapon.set(pickWeapon(ds))
    });
  }
}

export default {
  title: 'Molecules/WeaponComponent',
  component: StoryWeaponWrapper,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        {
          provide: PriceService,
          useValue: {
            getPrices: (name: string) => {
              name = PriceService.internalToApiId(name);
              console.log(`getPrices ${name}`)
              if (name === 'T4_PLANKS') return of(plankData0);
              if (name === 'T4_METALBAR') return of(metalbarData0);
              if (name === 'T4_MAIN_AXE') return of(mainAxeData0);

              if (name === 'T4_PLANKS_LEVEL1@1') return of(plankData);
              if (name === 'T4_METALBAR_LEVEL1@1') return of(metalbarData);
              if (name === 'T4_MAIN_AXE@1') return of(mainAxeData);
              return of([]);
            },
          },
        },
      ],
    }),
  ],
} as Meta<StoryWeaponWrapper>;

type Story = StoryObj<StoryWeaponWrapper>;
export const Default: Story = {

};
