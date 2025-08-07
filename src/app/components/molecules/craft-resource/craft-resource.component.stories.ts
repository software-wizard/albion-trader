import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {CraftResourceComponent} from './craft-resource.component';
import {CommonModule} from '@angular/common';

export default {
  title: 'molecules/CraftResource',
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
    craftResource: {uniquename: 'T4_PLANKS', count: '8'}
  }
};
