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
  <tap-radio-group>
    <tap-radio></tap-radio>
    <tap-radio></tap-radio>
    <tap-radio></tap-radio>
    <tap-radio></tap-radio>
  </tap-radio-group>
`;

export const RadioGroup = Template.bind({});

RadioGroup.args = {};
