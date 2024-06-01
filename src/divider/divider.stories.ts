import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'Divider',
  component: 'tap-divider',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-divider type="thin"> </tap-divider>
  <tap-divider> </tap-divider>
  <tap-divider type="bold"> </tap-divider>
`;

export const Divider = Template.bind({});

Divider.args = {};
