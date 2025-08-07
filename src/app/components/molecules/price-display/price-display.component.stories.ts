import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {PriceDisplayComponent} from './price-display.component';
import data from './t41-battle-axe-mock.json';
import data2 from './t41-ore-mock.json';
import {ItemQuality, PriceEntry, PriceType} from "../../../data-types/albion-price-data";
import {CommonModule} from "@angular/common";

export default {
  title: 'Molecules/PriceDisplay',
  component: PriceDisplayComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PriceDisplayComponent],
    }),
  ],
} as Meta<PriceDisplayComponent>;

type Story = StoryObj<PriceDisplayComponent>;

export const Weapons: Story = {
  args: {
    data: data as PriceEntry[],
    displayType: PriceType.SellMin,
  },
};

export const Resources: Story = {
  args: {
    visibleQualities: [ItemQuality.Normal],
    data: data2 as PriceEntry[],
    displayType: PriceType.SellMin,
  },
};
