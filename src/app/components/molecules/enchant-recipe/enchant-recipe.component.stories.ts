import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {EnchantRecipeComponent} from './enchant-recipe.component';
import {CommonModule} from '@angular/common';

export default {
  title: 'Molecules/SeparatorComponent',
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
    enchant:
      {
        enchantmentlevel: '1',
        itempower: '800',
        durability: '20250',
        craftingrequirements: [{
          silver: '0',
          time: '1.5',
          craftingfocus: '2251',
          craftresource: [
            {uniquename: 'T4_PLANKS_LEVEL1', enchantmentlevel: '1', count: '8'},
            {uniquename: 'T4_METALBAR_LEVEL1', enchantmentlevel: '1', count: '16'}
          ]
        }],
        upgraderequirements: {
          upgraderesource: {
            uniquename: 'T4_RUNE',
            count: '288'
          }
        }
      },
  },
};
