import {Meta, StoryObj} from '@storybook/angular';
import {IconComponent} from "./icon.component";

const meta: Meta<IconComponent> = {
  component: IconComponent,
  parameters: {
    layout: 'centered',
  },
  title: 'atoms/IconComponent',
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Primary: Story = {
  args: {
    itemName: 'T4_MAIN_AXE'
  },
};
