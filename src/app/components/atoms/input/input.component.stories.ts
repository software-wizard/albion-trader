import {Meta, StoryObj} from '@storybook/angular';
import {InputComponent} from "./input.component.ts ";

const meta: Meta<InputComponent> = {
  component: InputComponent,
  parameters: {
    layout: 'centered',
  },
  title: 'Atoms/InputComponent',
};
export default meta;

type Story = StoryObj<InputComponent>;

export const Primary: Story = {
  args: {
  },
};
