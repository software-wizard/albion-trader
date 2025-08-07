import {Meta, StoryObj} from '@storybook/angular';
import {LabelComponent} from "./label.component";

const meta: Meta<LabelComponent> = {
  component: LabelComponent,
  parameters: {
    layout: 'centered',
  },
  title: 'atoms/LabelComponent',
};
export default meta;
type Story = StoryObj<LabelComponent>;

export const Primary: Story = {
  args: {
    label: 'abc'
  },
};
