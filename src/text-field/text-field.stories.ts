import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "./index.js";

export default {
  title: "Components/TextField",
  component: "tap-text-field",
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArgTypes {}

const Template: Story<ArgTypes> = () => html`
  <tap-text-field
    label="لیبل"
    caption="متن ساپورت"
    placeholder="مقدار"
  >
  </tap-text-field>
`;

export const TextField = Template.bind({});

TextField.args = {};
