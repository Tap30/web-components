import { html, TemplateResult } from 'lit';
import './index.js';
import { Meta } from '@storybook/web-components';

export default {
  title: 'Components/Checkbox',
  component: 'tap-checkbox',
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = (_: ArgTypes) => html`
  <tap-checkbox></tap-checkbox>
`;

export const Checkbox = Template.bind({});

Checkbox.args = {};
