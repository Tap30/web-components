import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "./index.js";
import {
  type BadgePriority,
  type BadgeType,
  type BadgeValue,
  type BadgeVariant,
} from "./types";

const BadgeTypes = ["pill", "numeral", "dot"];
const BadgeVariants = ["success", "error", "info", "inverse", "warning"];
const BadgePriorities = ["high", "low"];

export default {
  title: "Components/Badge",
  component: "tap-badge",
  argTypes: {
    value: {
      control: "text",
      description: "Badge Value",
    },
    type: {
      options: BadgeTypes,
      control: { type: "inline-radio" },
      description: "Badge Type",
    },
    variant: {
      options: BadgeVariants,
      control: { type: "select" },
      description: "Badge Variant",
    },
    priority: {
      options: BadgePriorities,
      control: { type: "inline-radio" },
      description: "Badge Priority",
    },
    leadingIcon: {
      description: "Should have leading icon?",
      control: { type: "boolean" },
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  value: BadgeValue;
  type: BadgeType;
  variant: BadgeVariant;
  priority: BadgePriority;
  leadingIcon: boolean;
}

const Template: Story<ArgTypes> = ({
  value,
  variant,
  type,
  priority,
  leadingIcon,
}: ArgTypes) => html`
  <tap-badge
    value=${value}
    type=${type}
    variant=${variant}
    priority=${priority}
    ?leadingIcon=${leadingIcon}
  ></tap-badge>
`;

export const Badge = Template.bind({});

Badge.args = {
  value: "نشان",
  type: "pill",
  variant: "info",
  priority: "high",
  leadingIcon: false,
};
