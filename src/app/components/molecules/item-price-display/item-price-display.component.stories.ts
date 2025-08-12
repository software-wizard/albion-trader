import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {ItemPriceDisplayComponent} from './item-price-display.component';
import data from './t41-main-axe-mock.json';
import {PriceEntry, PriceType} from "../../../data-types/albion-price-data";
import {CommonModule} from "@angular/common";

export default {
  title: 'Molecules/ItemPriceDisplay',
  component: ItemPriceDisplayComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ItemPriceDisplayComponent],
    }),
  ],
} as Meta<ItemPriceDisplayComponent>;

type Story = StoryObj<ItemPriceDisplayComponent>;

export const Default: Story = {
  args: {
    prices: data as PriceEntry[],
    displayType: PriceType.SellMin,
  },
};
