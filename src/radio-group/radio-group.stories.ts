import { html, TemplateResult } from 'lit';
import '../radio';
import './index.js';

const radioGroupDirection: string[] = ['horizontal', 'vertical'];

export default {
  title: 'Radio Group',
  component: 'tap-radio-group',
  argTypes: {
    direction: {
      options: radioGroupDirection,
      control: { type: 'inline-radio' },
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  value?: string;
  direction?: 'vertical' | 'horizontal';
}

const Template: Story<ArgTypes> = ({ value, direction }: ArgTypes) => html`
  <tap-radio-group value="${value}" direction="${direction}">
    <tap-radio value="1"></tap-radio>
    <tap-radio value="2"></tap-radio>
    <tap-radio value="3"></tap-radio>
    <tap-radio value="4"></tap-radio>
  </tap-radio-group>
`;

export const RadioGroup = Template.bind({});

RadioGroup.args = {
  direction: 'vertical',
  value: '1',
};
