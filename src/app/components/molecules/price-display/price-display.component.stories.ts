import { Meta, StoryObj } from '@storybook/angular';
import { PriceDisplayComponent, PriceEntry, PriceType } from './price-display.component';

export default {
  title: 'Albion/PriceDisplay',
  component: PriceDisplayComponent,
  render: (args) => ({ props: args }),
} as Meta<PriceDisplayComponent>;

type Story = StoryObj<PriceDisplayComponent>;

export const Default: Story = {
  args: {
    data: data as PriceEntry[],
    displayType: PriceType.BuyMin,
  },
};
