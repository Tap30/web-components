import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'Checkbox',
  component: 'tap-checkbox',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-checkbox></tap-checkbox>
`;

export const Checkbox = Template.bind({});

Checkbox.args = {};
