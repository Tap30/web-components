import { html, TemplateResult } from "lit";
import "../radio";
import "./index.js";

export default {
  title: "Radio Group",
  component: "tap-radio-group",
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-radio-group value="2">
    <tap-radio value="1"></tap-radio>
    <tap-radio value="2"></tap-radio>
    <tap-radio value="3"></tap-radio>
    <tap-radio value="4"></tap-radio>
  </tap-radio-group>
`;

export const RadioGroup = Template.bind({});

RadioGroup.args = {};
