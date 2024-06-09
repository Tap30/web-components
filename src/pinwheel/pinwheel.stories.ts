import { html, TemplateResult } from 'lit';
import './index.js';
import { Meta } from '@storybook/web-components';

export default {
  title: 'Components/Pinwheel',
  component: 'tap-pinwheel',
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const items = [
  'عنوان ۱',
  'عنوان ۲',
  'عنوان ۳',
  'عنوان ۴',
  'عنوان ۵',
  'عنوان ۶',
  'عنوان ۷',
  'عنوان ۸',
  'عنوان ۹',
];

const Template: Story<ArgTypes> = () => html`
  <tap-pinwheel .items=${items}></tap-pinwheel>
`;

export const Pinwheel = Template.bind({});

Pinwheel.args = {};
