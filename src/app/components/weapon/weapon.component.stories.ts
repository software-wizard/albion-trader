import { Meta, StoryObj } from '@storybook/angular';
import { WeaponComponent } from './weapon.component';
import { CommonModule } from '@angular/common';
import { EnchantListComponent } from '../enchant-list/enchant-list.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

const meta: Meta<WeaponComponent> = {
  title: 'Albion/WeaponComponent',
  component: WeaponComponent,
  decorators: [
    {
      imports: [CommonModule, WeaponComponent, EnchantListComponent, RecipeListComponent],
    },
  ],
};

export default meta;
type Story = StoryObj<WeaponComponent>;

export const Default: Story = {
  args: {
    weapon: {
      uniquename: 'T7_2H_BOW_HELL',
      craftingrequirements: [
        {
          silver: '0',
          time: '3.333',
          craftingfocus: '9191',
          craftresource: [
            { uniquename: 'T7_PLANKS', count: '32' },
            { uniquename: 'T7_ARTEFACT_2H_BOW_HELL', count: '1' }
          ],
        },
      ],
      enchantments: {
        enchantment: [
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
                  { uniquename: 'T7_ARTEFACT_2H_BOW_HELL', count: '1' }
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
                  { uniquename: 'T7_ARTEFACT_2H_BOW_HELL', count: '1' }
                ],
              },
            ],
          }
        ]
      }
    }
  },
};
