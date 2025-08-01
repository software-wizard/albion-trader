import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {RecipeListComponent} from './recipe-list.component';
import {CommonModule} from '@angular/common';
import {CraftResource} from "../../data-types/albion-data";

export default {
  title: 'RecipeListComponent',
  component: RecipeListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RecipeListComponent],
    }),
  ],
} as Meta<RecipeListComponent>;

type Story = StoryObj<RecipeListComponent>;

export const Default: Story = {

  args: {
    craftingrequirements: [{
      silver: '0',
      time: '1',
      craftingfocus: '1286',
      craftresource: [
        { uniquename: 'T4_PLANKS', count: '8' },
        { uniquename: 'T4_METALBAR', count: '16' }
      ]
    }],
  },
};
