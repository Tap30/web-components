import { html, TemplateResult } from 'lit';
import './index.js';
import {Meta} from "@storybook/web-components";

export default {
  title: 'Components/Progress Indicator',
  component: 'tap-progress-indicator',
  argTypes: {
    current: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Progress indicator current value',
    },
    max: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Progress indicator max value',
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  current: number;
  max: number;
}

const Template: Story<ArgTypes> = ({ current, max }: ArgTypes) => html`
  <tap-progress-indicator
    current=${current}
    max=${max}
  ></tap-progress-indicator>
`;

export const ProgressIndicator = Template.bind({});

ProgressIndicator.args = {
  current: 2,
  max: 10,
};
