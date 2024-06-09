import { html, TemplateResult } from 'lit';
import './index.js';
import { Meta } from '@storybook/web-components';

export default {
  title: 'Components/Modal',
  component: 'tap-modal',
  argTypes: {
    open: { control: 'boolean' },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  open: boolean;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({ open, slot }: ArgTypes) => html`
  <tap-modal .open=${open}> ${slot} </tap-modal>
`;

export const Modal = Template.bind({});

Modal.args = {
  open: true,
};
