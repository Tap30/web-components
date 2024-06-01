import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'Step Indicator',
  component: 'tap-step-indicator',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-step-indicator .steps=${5}></tap-step-indicator>
`;

export const StepIndicator = Template.bind({});

StepIndicator.args = {};
