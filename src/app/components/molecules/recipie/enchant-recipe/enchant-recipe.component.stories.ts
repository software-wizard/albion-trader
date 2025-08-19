import {applicationConfig, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {of} from 'rxjs';
import metalbarData from '../t41-metal-bar-mock.json';
import plankData from '../t41-plank-mock.json';
import {PriceService} from "../../../../services/price-service";
import {PriceEntry} from "../../../../data-types/albion-price-data";
import {EnchantRecipeComponent} from "./enchant-recipe.component";
import {signal} from "@angular/core";

export default {
  title: 'Molecules/CraftRecipes/EnchantRecipeComponent',
  component: EnchantRecipeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, EnchantRecipeComponent],
    }),
    applicationConfig({
      providers: [
        {
          provide: PriceService,
          useValue: {
            getPrices: (name: string) => {
              if (name === 'T4_PLANKS_LEVEL1@1') return of(plankData as PriceEntry[]);
              if (name === 'T4_METALBAR_LEVEL1@1') return of(metalbarData as PriceEntry[]);
              return of([]);
            }
          }
        }
      ]
    })
  ],
  parameters: {layout: 'centered'},
} as Meta<EnchantRecipeComponent>;

type Story = StoryObj<EnchantRecipeComponent>;

export const Default: Story = {
  args: {
    enchant:
      {
        enchantmentlevel: '1',
        itempower: '800',
        durability: '20250',
        craftingrequirements: [{
          silver: '0',
          time: '1.5',
          craftingfocus: '2251',
          craftresource: [
            {uniquename: 'T4_PLANKS_LEVEL1@1', enchantmentlevel: '1', count: '8'},
            {uniquename: 'T4_METALBAR_LEVEL1@1', enchantmentlevel: '1', count: '16'}
          ]
        }],
        upgraderequirements: {
          upgraderesource: [{
            uniquename: 'T4_RUNE',
            count: '288'
          }]
        }
      },
    totalResourcesCostSignal: signal(0)
  },
};
