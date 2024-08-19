import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'PinInput',
  component: 'tap-pin-input-cell',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = (/*{}: ArgTypes*/) => html`
  <tap-pin-input-cell value="4"> </tap-pin-input-cell>
`;

export const PinInputCell = Template.bind({});

PinInputCell.args = {};
