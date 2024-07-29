import { html, TemplateResult } from 'lit';
import './index.js';
import { Meta } from '@storybook/web-components';

const spinnerVariants: string[] = ['default', 'primary', 'inverse'];
const spinnerSize: string[] = [ 'small' , 'medium' , 'large' ]

export default {
  title: 'Components/Spinner',
  component: 'tap-spinner',
  argTypes: {
    variant: {
      description: 'Spinner variant',
      options: spinnerVariants,
      control: { type: 'select' },
    },
    size: {
      description: 'Spinner size',
      options: spinnerSize,
      control: { type: 'select' },
    }
  },
  decorators: [
    (Story: () => TemplateResult) =>
      html` <div style="background: #0000001f; height: 100vh; margin: -1rem;">
        ${Story()}
      </div>`,
  ],
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  variant: 'default' | 'primary' | 'inverse';
  size: 'small' | 'medium'| 'large';
}

const Template: Story<ArgTypes> = ({ variant, size }: ArgTypes) => html`
  <tap-spinner variant=${variant} size=${size} ></tap-spinner>
`;

export const Spinner = Template.bind({});

Spinner.args = {
  size: 'medium',
};
