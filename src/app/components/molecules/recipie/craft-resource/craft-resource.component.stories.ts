import {applicationConfig, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {CraftResourceComponent} from './craft-resource.component';
import {PriceEntry} from '../../../../data-types/albion-price-data';
import data from '../t41-metal-bar-mock.json';
import {of} from 'rxjs';
import {PriceService} from "../../../../services/price-service";

export default {
  title: 'molecules/CraftRecipes/CraftResourceComponent',
  component: CraftResourceComponent,
  decorators: [
    moduleMetadata({imports: [CommonModule, CraftResourceComponent]}),
    applicationConfig({
      providers: [
        {
          provide: PriceService,
          useValue: {
            getPrices: (name: string) =>
              of((data as PriceEntry[]).filter(e => e.item_id === name))
          }
        }
      ]
    })
  ],
  parameters: {layout: 'centered'}
} as Meta<CraftResourceComponent>;

type Story = StoryObj<CraftResourceComponent>;

export const Default: Story = {
  args: {
    craftResource: {uniquename: 'T4_METALBAR_LEVEL1@1', count: '8'}
  }
};
