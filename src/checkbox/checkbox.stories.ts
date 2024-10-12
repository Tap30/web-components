import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "./index.js";

export default {
  title: "Components/Checkbox",
  component: "tap-checkbox",
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArgTypes {}

const Template: Story<ArgTypes> = () => html` <tap-checkbox></tap-checkbox> `;

export const Checkbox = Template.bind({});

Checkbox.args = {};
