import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {RecipeEntryComponent} from './recipe-entry.component';
import {CommonModule} from '@angular/common';

export default {
  title: 'Atoms/RecipeEntry',
  component: RecipeEntryComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RecipeEntryComponent],
    }),
  ],
} as Meta<RecipeEntryComponent>;

type Story = StoryObj<RecipeEntryComponent>;

export const Default: Story = {
  args: {
    craftResource: {uniquename: 'T4_PLANKS', count: '8'}
  }
};
