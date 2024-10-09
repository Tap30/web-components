import { spreadProps } from "@open-wc/lit-helpers";
import { type Meta } from "@storybook/web-components";
import "@tapsioss/icons/dist/icons/default";
import { html, type TemplateResult } from "lit";
import buttonStory from "../button/button.stories";

export default {
  ...buttonStory,
  title: "Components/IconButton",
  component: "tap-icon-button",
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

type ArgTypes = {
  slot2: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  size: "small" | "medium" | "large";
  variant: "primary" | "ghost" | "naked" | "elevated" | "destructive" | "brand";
};

const Template: Story<ArgTypes> = (props: ArgTypes) => html`
  <tap-icon-button
    @click=${() => {
      // eslint-disable-next-line no-alert
      alert("Clicked!");
    }}
    ${spreadProps(props)}
  >
    <tap-icon-default></tap-icon-default>
  </tap-icon-button>
`;

export const IconButton = Template.bind({});

IconButton.args = {
  disabled: false,
  loading: false,
  type: "button",
  size: "medium",
  variant: "brand",
};
