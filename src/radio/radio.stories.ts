import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'Radio',
  component: 'tap-radio',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-radio></tap-radio>
`;

export const Radio = Template.bind({});

Radio.args = {};
