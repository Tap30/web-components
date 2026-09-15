import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Button } from "@tapsioss/react-ui";

// Imported by PACKAGE NAME, not by relative path. Stories therefore consume the
// same public surface a real app does, so a component missing from the barrel
// in `packages/react-ui/src/index.ts` breaks its story immediately.
//
// CONVENTION: one story per component. Every prop is exposed through the
// Controls panel instead of being frozen into separate stories, so variants and
// sizes are explored by changing controls rather than by clicking between
// entries in the sidebar. Add extra stories only when a component has states
// that controls genuinely cannot express — a multi-step flow, or a composition
// of several sub-components.

const meta = {
  // Sidebar grouping comes from `title`, one top-level segment per package.
  title: "React UI/Button",
  component: Button,
  // `autodocs` generates a Docs page with a full props table from the types.
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button content.",
      table: { category: "Content" },
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "ghost", "destructive"],
      description:
        "Visual style. Each variant sets only the background and content colour, both from `@tapsioss/theme` tokens.",
      table: {
        category: "Appearance",
        type: { summary: '"primary" | "ghost" | "destructive"' },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Control height, padding and label typography.",
      table: {
        category: "Appearance",
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Base UI reflects this as `data-disabled`, which the stylesheet targets.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    type: {
      control: "inline-radio",
      options: ["button", "submit", "reset"],
      description: "Native button type. Matches the HTML default of `submit`.",
      table: {
        category: "Behaviour",
        defaultValue: { summary: "submit" },
      },
    },
    onClick: {
      action: "clicked",
      table: { category: "Behaviour" },
    },
  },
  args: {
    children: "دکمه تپسی",
    variant: "primary",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Use the **Controls** panel to switch variant, size and state. The RTL/LTR
 * toggle lives in the toolbar above the canvas.
 */
export const Playground: Story = {};
