import { html, TemplateResult } from "lit";
import "./text-field.js";

export default {
  title: "TextField",
  component: "tap-text-field",
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-text-field label="لیبل" caption="متن ساپورت" placeholder="مقدار">
  </tap-text-field>
`;

export const TextField = Template.bind({});

TextField.args = {};
