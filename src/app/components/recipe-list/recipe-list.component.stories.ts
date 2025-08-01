import { Meta, StoryObj } from '@storybook/angular';
import { RecipeListComponent } from './recipe-list.component';
import { CommonModule } from '@angular/common';

const meta: Meta<RecipeListComponent> = {
  title: 'Albion/RecipeListComponent',
  component: RecipeListComponent,
  decorators: [
    {
      imports: [CommonModule, RecipeListComponent],
    },
  ],
};

export default meta;
type Story = StoryObj<RecipeListComponent>;

export const Default: Story = {
  args: {
    recipes: [
      {
        silver: '0',
        time: '3.333',
        craftingfocus: '9191',
        craftresource: [
          { uniquename: 'T7_PLANKS', count: '32' },
          { uniquename: 'T7_ARTEFACT_2H_BOW_HELL', count: '1' }
        ],
      },
    ]
  },
};
