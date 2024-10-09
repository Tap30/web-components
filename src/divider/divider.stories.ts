import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "./index.js";

export default {
  title: "Components/Divider",
  component: "tap-divider",
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
  <tap-divider type="thin"> </tap-divider>
  <tap-divider> </tap-divider>
  <tap-divider type="bold"> </tap-divider>
`;

export const Divider = Template.bind({});

Divider.args = {};
