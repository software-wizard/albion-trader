import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {EnchantRecipeComponent} from './enchant-recipe.component';
import {CommonModule} from '@angular/common';

export default {
  title: 'Molecules/EnchantRecipeComponent',
  component: EnchantRecipeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, EnchantRecipeComponent],
    }),
  ],
} as Meta<EnchantRecipeComponent>;

type Story = StoryObj<EnchantRecipeComponent>;

export const Default: Story = {
  args: {
    enchantment:
      {
        enchantmentlevel: '1',
        itempower: '1150',
        durability: '144728',
        craftingrequirements: [
          {
            silver: '0',
            time: '5',
            craftingfocus: '16085',
            craftresource: [
              {uniquename: 'T7_PLANKS_LEVEL1', count: '32'},
              {uniquename: 'T7_ARTEFACT_2H_BOW_HELL', count: '1'},
            ],
          },
        ],
      },
  },
};
