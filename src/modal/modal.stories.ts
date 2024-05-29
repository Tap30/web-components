import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'Modal',
  component: 'tap-modal',
  argTypes: {
    open: { control: 'boolean' },
  },
};

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
