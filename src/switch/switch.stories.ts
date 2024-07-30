import { html, TemplateResult } from 'lit';
import { spreadProps } from '@open-wc/lit-helpers';
import './index.js';

export default {
  title: 'Components/Switch',
  component: 'tap-switch',
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

type ArgTypes = {
  disabled: boolean;
};

const defaultProps: ArgTypes = {
  disabled: false,
};

const Template: Story<ArgTypes> = (props: ArgTypes) => html`
  <tap-switch ${spreadProps(props)}></tap-switch>
`;

export const Switch = Template.bind({});

Switch.args = defaultProps;
