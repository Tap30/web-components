import { html, TemplateResult } from 'lit';
import './index.js';
import '../tooltip';

export default {
  title: 'Bottom Sheet',
  component: 'tap-bottom-sheet',
  parameters: {
    layout: 'fullscreen', // or `padded` by default
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}) => {
  return html` <tap-bottom-sheet></tap-bottom-sheet>`;
};

export const Simple = Template.bind({});
Simple.args = {};
