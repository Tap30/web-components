import { html, TemplateResult } from 'lit';
import './index.js';
import { Meta } from '@storybook/web-components';
import 'custom-element-manifest-demo/dist';

export default {
  title: 'Components/Radio',
  component: 'tap-radio',
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = () => html` <tap-radio></tap-radio> `;

export const Radio = Template.bind({});

Radio.args = {};
