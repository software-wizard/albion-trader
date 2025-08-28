import {Meta, StoryObj} from '@storybook/angular';
import {signal} from "@angular/core";
import {DropdownComponent} from "./dropdown.component";

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  parameters: {
    layout: 'centered',
  },
  title: 'atoms/dropdownComponent',
};
export default meta;

type Story = StoryObj<DropdownComponent>;

export const Focus: Story = {
  args: {
    label: 'Focus',
    placeholder: 'Select focus percentage',
    valueSignal: signal(47.9),
    options: [
      { value: 43.5, label: '43.5%' },
      { value: 46.5, label: '46.5%' },
      { value: 49.2, label: '49.2%' },
      { value: 47.9, label: '47.9%' },
      { value: 50.5, label: '50.5%' },
      { value: 52.8, label: '52.8%' }
    ]
  },
};

export const Cities: Story = {
  args: {
    label: 'City',
    placeholder: 'Select city',
    valueSignal: signal(null),
    options: [
      { value: 'Fort Sterling', label: 'Fort Sterling' },
      { value: 'Lymhurst', label: 'Lymhurst' },
      { value: 'Bridgewatch', label: 'Bridgewatch' },
      { value: 'Martlock', label: 'Martlock' },
      { value: 'Thetford', label: 'Thetford' },
      { value: 'Black Market', label: 'Black Market' }
    ]
  },
};
