import { html, TemplateResult } from "lit";
import { spreadProps } from "@open-wc/lit-helpers";
import buttonStory from "../button/button.stories";
import "./index.js";
import "../icons/default";
import "../icons/alarm-clock";

const buttonTypes = ["button", "submit", "reset"];
const buttonSizes = ["small", "medium", "large"];
const buttonVariants = [
  "primary",
  "ghost",
  "naked",
  "elevated",
  "destructive",
  "brand",
];

export default {
  ...buttonStory,
  title: "IconButton",
  component: "tap-icon-button",
};

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

const Template: Story<ArgTypes> = (props: ArgTypes) =>
  html`
    <tap-icon-button @click=${() => alert("Clicked!")} ${spreadProps(props)}>
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
