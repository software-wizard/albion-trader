import {Meta, StoryObj} from '@storybook/angular';
import {signal} from "@angular/core";
import {HeaderComponent} from "./header.component";

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  parameters: {
    layout: 'centered',
  },
  title: 'organisms/headerComponent',
};
export default meta;

type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    rrrValueSignal: signal(47.9),
    resourcesPriceSignal: signal(null),
    itemPriceSignal: signal(null)
  },
};
