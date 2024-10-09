import { type Meta } from "@storybook/web-components";
import "@tapsioss/icons/dist/icons/default";
import { type TemplateResult, html } from "lit";
import "../chip";
import "./index.js";

export default {
  title: "Components/Chip Group",
  component: "tap-chip-group",
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
  <tap-chip-group mode="single-select">
    <tap-chip
      size="md"
      hasIcon
      disabled
    >
      <span>اینترنت</span>
      <tap-icon-default slot="icon"></tap-icon-default>
    </tap-chip>
    <tap-chip
      size="md"
      hasIcon
    >
      <span>اینترنت</span>
      <tap-icon-default slot="icon"></tap-icon-default>
    </tap-chip>
    <tap-chip hasIcon>
      <span>اینترنت</span>
      <tap-icon-default slot="icon"></tap-icon-default>
    </tap-chip>
    <tap-chip
      selected
      disabled
    >
      اینترنت
    </tap-chip>
  </tap-chip-group>
`;

export const ChipGroup = Template.bind({});

ChipGroup.args = {};
