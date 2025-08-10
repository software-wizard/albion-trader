import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { CraftRecipeComponent } from './craft-recipe.component';
import metalbarData from '../t41-metal-bar-mock.json';
import plankData from '../t41-plank-mock.json';
import {PriceService} from "../../../../services/price-service";
import {PriceEntry} from "../../../../data-types/albion-price-data";

export default {
  title: 'Molecules/CraftRecipes/CraftRecipeComponent',
  component: CraftRecipeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CraftRecipeComponent],
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
  parameters: { layout: 'centered' },
} as Meta<CraftRecipeComponent>;

type Story = StoryObj<CraftRecipeComponent>;

export const Default: Story = {
  args: {
    craftingrequirement: {
      silver: '0',
      time: '1',
      craftingfocus: '1286',
      craftresource: [
        { uniquename: 'T4_PLANKS_LEVEL1@1', count: '8' },
        { uniquename: 'T4_METALBAR_LEVEL1@1', count: '16' }
      ]
    }
  }
};
