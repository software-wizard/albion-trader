import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { WeaponComponent } from './weapon.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Molecules/WeaponComponent',
  component: WeaponComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, WeaponComponent],
    }),
  ],
} as Meta<WeaponComponent>;

type Story = StoryObj<WeaponComponent>;

export const Default: Story = {
  args: {
    weapon: {
      uniquename: 'T4_MAIN_AXE',
      maxqualitylevel: '5',
      abilitypower: '138',
      slottype: 'mainhand',
      shopcategory: 'weapons',
      shopsubcategory1: 'axe',
      attacktype: 'melee',
      mainhandanimationtype: 'axe',
      attackdamage: '41',
      attackspeed: '1.1',
      twohanded: 'false',
      attackrange: '3',
      tier: '4',
      weight: '5.1',
      activespellslots: '3',
      passivespellslots: '1',
      durability: '13500',
      durabilityloss_attack: '1',
      durabilityloss_spelluse: '1',
      durabilityloss_receivedattack: '1',
      durabilityloss_receivedspell: '1',
      unlockedtocraft: 'false',
      unlockedtoequip: 'false',
      hitpointsmax: '50',
      itempower: '700',
      hitpointsregenerationbonus: '0.05',
      physicalspelldamagebonus: '0',
      magicspelldamagebonus: '0',
      itempowerprogressiontype: 'mainhand',
      focusfireprotectionpenetration: '0.3',
      uicraftsoundstart: 'Play_ui_action_craft_metal_start',
      uicraftsoundfinish: 'Play_ui_action_craft_metal_finish',
      craftingcategory: 'axe',
      healmodifier: '0',
      canbeovercharged: 'true',
      masterymodifier: '0',
      combatspecachievement: 'COMBAT_AXES_AXE',
      physicalattackdamagebonus: '0',
      magicattackdamagebonus: '0',
      shopsubcategory2: 'axe_main_axe',
      craftingrequirements: [{
        silver: '0',
        time: '1',
        craftingfocus: '1286',
        craftresource: [
          { uniquename: 'T4_PLANKS', count: '8' },
          { uniquename: 'T4_METALBAR', count: '16' }
        ]
      }],
      SocketPreset: {
        name: 'MAINHAND'
      },
      craftingspelllist: {
        craftspell: [
          { uniquename: 'RENDINGSTRIKE', slots: '1' },
          { uniquename: 'AXESMASH', slots: '2' },
          { uniquename: 'AXEBOOST', slots: '2' },
          { uniquename: 'RENDINGSPIN', slots: '1', tag: 'C' },
          { uniquename: 'AXE_CHARGE', slots: '2', tag: 'D' },
          { uniquename: 'INNERBLEEDING', slots: '2', tag: 'F' },
          { uniquename: 'BLADE_AURA', slots: '2', tag: 'H' },
          { uniquename: 'RENDINGCOMBO', slots: '1', tag: 'I' },
          { uniquename: 'AXETHROW', slots: '3', tag: 'A' },
          { uniquename: 'PASSIVE_BLEEDCHANCE' },
          { uniquename: 'PASSIVE_HEALTHCHANCE_AXE', tag: 'B' },
          { uniquename: 'PASSIVE_ARMORCHANCE_AXE', tag: 'E' },
          { uniquename: 'PASSIVE_SPELLPOWER_CHANCE_AXE', tag: 'G' }
        ]
      },
      AudioInfo: {
        name: 'ITEM_AXE_SMALL'
      },
      enchantments: {
        enchantment: [
          {
            enchantmentlevel: '1',
            itempower: '800',
            durability: '20250',
            craftingrequirements: [{
              silver: '0',
              time: '1.5',
              craftingfocus: '2251',
              craftresource: [
                { uniquename: 'T4_PLANKS_LEVEL1', enchantmentlevel: '1', count: '8' },
                { uniquename: 'T4_METALBAR_LEVEL1', enchantmentlevel: '1', count: '16' }
              ]
            }],
            upgraderequirements: {
              upgraderesource: {
                uniquename: 'T4_RUNE',
                count: '288'
              }
            }
          },
          {
            enchantmentlevel: '2',
            itempower: '900',
            durability: '30375',
            craftingrequirements: [{
              silver: '0',
              time: '2',
              craftingfocus: '3939',
              craftresource: [
                { uniquename: 'T4_PLANKS_LEVEL2', enchantmentlevel: '2', count: '8' },
                { uniquename: 'T4_METALBAR_LEVEL2', enchantmentlevel: '2', count: '16' }
              ]
            }],
            upgraderequirements: {
              upgraderesource: {
                uniquename: 'T4_SOUL',
                count: '288'
              }
            }
          },
          {
            enchantmentlevel: '3',
            itempower: '1000',
            durability: '45563',
            craftingrequirements: [{
              silver: '0',
              time: '2.5',
              craftingfocus: '6893',
              craftresource: [
                { uniquename: 'T4_PLANKS_LEVEL3', enchantmentlevel: '3', count: '8' },
                { uniquename: 'T4_METALBAR_LEVEL3', enchantmentlevel: '3', count: '16' }
              ]
            }],
            upgraderequirements: {
              upgraderesource: {
                uniquename: 'T4_RELIC',
                count: '288'
              }
            }
          },
          {
            enchantmentlevel: '4',
            itempower: '1100',
            durability: '68344',
            craftingrequirements: [{
              silver: '0',
              time: '3.75',
              craftingfocus: '12064',
              craftresource: [
                { uniquename: 'T4_PLANKS_LEVEL4', enchantmentlevel: '4', count: '8' },
                { uniquename: 'T4_METALBAR_LEVEL4', enchantmentlevel: '4', count: '16' }
              ]
            }]
          }
        ]
      }
    } as any,
  },
};
