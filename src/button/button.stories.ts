import { html, TemplateResult } from "lit";
import { spreadProps } from "@open-wc/lit-helpers";
import "./index.js";

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
  title: "Button",
  component: "tap-button",
  argTypes: {
    slot: {
      description: "Button slot content",
      control: { type: "text" },
    },
    disabled: {
      description: "Is the button disabled?",
      control: { type: "boolean" },
      defaultValue: false,
    },
    type: {
      description: "Button type",
      options: buttonTypes,
      control: { type: "inline-radio" },
    },
    loading: {
      description: "Is the button loading?",
      control: { type: "boolean" },
      defaultValue: false,
    },
    size: {
      description: "Button size",
      options: buttonSizes,
      control: { type: "inline-radio" },
    },
    variant: {
      description: "Button variant",
      options: buttonVariants,
      control: { type: "select" },
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

type ArgTypes = {
  slot: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  size: "small" | "medium" | "large";
  variant: "primary" | "ghost" | "naked" | "elevated" | "destructive" | "brand";
};

const Template: Story<ArgTypes> = (props: ArgTypes) =>
  html`
    <tap-button @click=${() => alert("Clicked!")} ${spreadProps(props)}>
      ${props.slot}
    </tap-button>
  `;

export const Button = Template.bind({});

Button.args = {
  slot: "A Beautiful Button",
  disabled: false,
  loading: false,
  type: "button",
  size: "medium",
  variant: "brand",
};
