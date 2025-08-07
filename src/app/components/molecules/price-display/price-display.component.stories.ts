import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {PriceDisplayComponent} from './price-display.component';
import data from './price-display-mock.json';
import {PriceEntry, PriceType} from "../../../data-types/albion-price-data";
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

export const Default: Story = {
  args: {
    data: data as PriceEntry[],
    displayType: PriceType.SellMin,
  },
};
