import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "../pinwheel";
import "./index.js";

export default {
  title: "Components/Pinwheel",
  component: "tap-pinwheel-group",
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArgTypes {}

const items = [
  "عنوان ۱",
  "عنوان ۲",
  "عنوان ۳",
  "عنوان ۴",
  "عنوان ۵",
  "عنوان ۶",
  "عنوان ۷",
  "عنوان ۸",
  "عنوان ۹",
];

const Template: Story<ArgTypes> = () => html`
  <tap-pinwheel-group>
    <tap-pinwheel .items=${items}></tap-pinwheel>
    <tap-pinwheel .items=${items}></tap-pinwheel>
    <tap-pinwheel .items=${items}></tap-pinwheel>
  </tap-pinwheel-group>
`;

export const PinwheelGroup = Template.bind({});

PinwheelGroup.args = {};
