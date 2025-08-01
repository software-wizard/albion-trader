import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { EnchantListComponent } from './enchant-list.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'EnchantListComponent',
  component: EnchantListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, EnchantListComponent],
    }),
  ],
} as Meta<EnchantListComponent>;

type Story = StoryObj<EnchantListComponent>;

export const Default: Story = {
  args: {
    enchantments: [
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
              { uniquename: 'T7_PLANKS_LEVEL1', count: '32' },
              { uniquename: 'T7_ARTEFACT_2H_BOW_HELL', count: '1' },
            ],
          },
        ],
      },
      {
        enchantmentlevel: '2',
        itempower: '1250',
        durability: '217091',
        craftingrequirements: [
          {
            silver: '0',
            time: '6',
            craftingfocus: '28148',
            craftresource: [
              { uniquename: 'T7_PLANKS_LEVEL2', count: '32' },
              { uniquename: 'T7_ARTEFACT_2H_BOW_HELL', count: '1' },
            ],
          },
        ],
      },
    ],
  },
};
