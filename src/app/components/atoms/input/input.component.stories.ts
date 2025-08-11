import {Meta, StoryObj} from '@storybook/angular';
import {InputComponent} from "./input.component";

const meta: Meta<InputComponent> = {
  component: InputComponent,
  parameters: {
    layout: 'centered',
  },
  title: 'Atoms/InputComponent',
};
export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
  },
};
