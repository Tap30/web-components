import {html, TemplateResult,} from "lit";
import {spreadProps} from "@open-wc/lit-helpers";
import "./index.js";
import "../icons/default";

const buttonSlots = ["Text", "Icon"];
const buttonTypes = ["button", "submit", "reset"];
const buttonSizes = ["small", "medium", "large"];
const buttonVariants = ["primary", "ghost", "naked", "elevated", "destructive", "brand"];

export default {
  title: "Button",
  component: "tap-button",
  argTypes: {
    slot: {
      description: "Button slot content",
      options: buttonSlots,
      control: {type: "select"},
    },
    disabled: {
      description: "Is the button disabled?",
      control: {type: "boolean"},
      defaultValue: false,
    },
    type: {
      description: "Button type",
      options: buttonTypes,
      control: {type: "inline-radio"},
    },
    loading: {
      description: "Is the button loading?",
      control: {type: "boolean"},
      defaultValue: false,
    },
    size: {
      description: "Button size",
      options: buttonSizes,
      control: {type: "inline-radio"},
    },
    variant: {
      description: "Button variant",
      options: buttonVariants,
      control: {type: "select"},
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

type  ArgTypes = {
  slot: string,
  disabled?: boolean,
  loading?: boolean,
  type?: "button" | "submit" | "reset",
  size: "small" | "medium" | "large",
  variant:
    | "primary"
    | "ghost"
    | "naked"
    | "elevated"
    | "destructive"
    | "brand"
}

const Template: Story<ArgTypes> = (props: ArgTypes) => {
  const icon = html`
    <tap-icon-default></tap-icon-default>`;

  let slot = props.slot === "Text" ? "Simple Text" : icon;
  return html`
    <tap-button
      @click=${() => alert('Clicked!')}
      ${spreadProps(props)}
    >
      ${slot}
    </tap-button>
  `;
};

export const Button = Template.bind({});

Button.args = {
  slot: 'text',
  disabled: false,
  loading: false,
  type: 'button',
  size: 'medium',
  variant: 'brand'
};
