import { type Meta } from "@storybook/web-components";
import "custom-elements-manifest";
import { html, type TemplateResult } from "lit";
import "./index.js";

export default {
  title: "Components/Radio",
  component: "tap-radio",
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArgTypes {}

const Template: Story<ArgTypes> = () => html` <tap-radio></tap-radio> `;

export const Radio = Template.bind({});

Radio.args = {};
