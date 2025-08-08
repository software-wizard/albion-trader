import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {CraftResourceComponent} from './craft-resource.component';
import {CommonModule} from '@angular/common';
import data from "./t41-metal-bar-mock.json";
import {PriceEntry} from "../../../../data-types/albion-price-data";

export default {
  title: 'molecules/CraftRecipeComponent/CraftResource',
  component: CraftResourceComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CraftResourceComponent],
    }),
  ],
} as Meta<CraftResourceComponent>;

type Story = StoryObj<CraftResourceComponent>;

export const Default: Story = {
  args: {
    craftResource: {uniquename: 'T4_METALBAR_LEVEL1@1', count: '8'},
    resourcePrices: data as PriceEntry[],
  }
};
