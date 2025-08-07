import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {CraftRecipeComponent} from './craft-recipe.component';
import {CommonModule} from '@angular/common';

export default {
  title: 'Molecules/CraftRecipeComponent',
  component: CraftRecipeComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CraftRecipeComponent],
    }),
  ],
} as Meta<CraftRecipeComponent>;

type Story = StoryObj<CraftRecipeComponent>;

export const Default: Story = {

  args: {
    craftingrequirement: {
      silver: '0',
      time: '1',
      craftingfocus: '1286',
      craftresource: [
        { uniquename: 'T4_PLANKS', count: '8' },
        { uniquename: 'T4_METALBAR', count: '16' }
      ]
    },
  },
};
