import { html, TemplateResult } from 'lit';
import './index.js';
import { spreadProps } from '@open-wc/lit-helpers';
import {Meta} from "@storybook/web-components";

const stepperSizes: string[] = ['small', 'medium'];

export default {
  title: 'Components/Stepper',
  component: 'tap-stepper',
  argTypes: {
    unit: {
      control: 'text',
      description: 'َUnit of steps',
      defaultValue: 'دقیقه',
    },
    disabled: {
      description: 'If true both button will be disabled',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    fullWidth: {
      description: 'If true width of the component will be "100%"',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    step: {
      control: 'number',
      description: 'Increasing or decreasing step size',
      defaultValue: 1,
    },
    min: {
      control: 'number',
      description:
        'Minimum amount of value (if value reaches the min the decrease button will be disabled)',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      description:
        'Maximum amount of value (if value reaches the max the increase button will be disabled)',
      defaultValue: 10,
    },
    size: {
      options: stepperSizes,
      control: { type: 'inline-radio' },
      description:
        'Size of the stepper (if size sets to medium, unit will be shown)',
      defaultValue: `"small"`,
    },
    value: {
      control: 'number',
      description: 'Value of stepper',
      defaultValue: 2,
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

type ArgTypes = {
  unit: string;
  step: number;
  min: number;
  max: number;
  size: 'small' | 'medium';
  value: number;
  disabled: boolean;
  fullWidth: boolean;
};

const defaultProps: ArgTypes = {
  unit: '',
  step: 1,
  min: 0,
  max: 10,
  size: 'medium',
  value: 2,
  disabled: false,
  fullWidth: false,
};

const Template: Story<ArgTypes> = (props) => html`
  <tap-stepper ${spreadProps(props)}></tap-stepper>
`;

export const Stepper = Template.bind({});

Stepper.args = defaultProps;
