import { html, TemplateResult } from 'lit';
import './index.js';
import { Meta } from '@storybook/web-components';

export default {
  title: 'Components/Step Indicator',
  component: 'tap-step-indicator',
  argTypes: {},
} as Meta;

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
