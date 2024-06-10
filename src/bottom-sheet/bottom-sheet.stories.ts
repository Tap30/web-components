import { html, TemplateResult } from 'lit';
import './index.js';
import '../tooltip';

export default {};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}) => {
  return html` <tap-bottom-sheet> </tap-bottom-sheet> `;
};

export const Simple = Template.bind({});
Simple.args = {};
