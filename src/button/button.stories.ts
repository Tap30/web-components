import {html, TemplateResult} from "lit";
import "./index.js";

const buttonTypes: string[] = ["button", "submit", "reset"];
const buttonSizes: string[] = ["small", "medium", "large"];
const buttonVariants: string[] = ["primary", "ghost", "naked", "elevated", "destructive", "brand"];

export default {
  title: "Button",
  component: "tap-button",
  argTypes: {
    slot: {
      description: "Button slot content",
      control: {type: "text"},
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

interface ArgTypes {
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
    | "brand",
}

const Template: Story<ArgTypes> = ({
   slot,
   disabled,
   loading,
   type,
   size,
   variant,
 }: ArgTypes) => html`
  <tap-button
    ?disabled=${disabled}
    ?loading=${loading}
    type=${type}
    size=${size}
    variant=${variant}
    @click=${() => alert('Clicked!')}
  >
    ${slot}
  </tap-button>
`;

export const Button = Template.bind({});

Button.args = {
  slot: 'a beautiful button',
  disabled: false,
  loading: false,
  type: 'button',
  size: 'medium',
  variant: 'brand'
};
