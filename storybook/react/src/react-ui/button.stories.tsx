import { type Meta, type StoryObj } from "@storybook/react-vite";
import { CircleCross } from "@tapsioss/react-icons";
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
    leadingAdornment: {
      control: "boolean",
      mapping: { true: <CircleCross />, false: undefined },
      description:
        "Rendered before the content — an icon, a counter, a badge. Any `ReactNode`; the control here just toggles a sample icon.",
      table: { category: "Content" },
    },
    trailingAdornment: {
      control: "boolean",
      mapping: { true: <CircleCross />, false: undefined },
      description: "Rendered after the content.",
      table: { category: "Content" },
    },
    variant: {
      control: "inline-radio",
      options: ["default", "elevated", "destructive", "cta"],
      description:
        "Colour scheme — Figma's `Variant`. `elevated` and `cta` exist only as `primary`; the type rejects the other pairings.",
      table: {
        category: "Appearance",
        type: { summary: '"default" | "elevated" | "destructive" | "cta"' },
        defaultValue: { summary: "default" },
      },
    },
    hierarchy: {
      control: "inline-radio",
      options: ["primary", "secondary", "tertiary"],
      description:
        "How much visual weight the button carries — Figma's `Hierarchy`. `secondary` and `tertiary` apply to `default` and `destructive` only.",
      table: {
        category: "Appearance",
        type: { summary: '"primary" | "secondary" | "tertiary"' },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description:
        "Control height, padding, gap and label typography — all from `Dimension/Component/Button/*`.",
      table: {
        category: "Appearance",
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
      },
    },
    fullWidth: {
      control: "boolean",
      description:
        "Stretch to fill the available inline space. Drops the design's minimum width so the button can also go narrower than it.",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description:
        "Native disabled: removed from the tab order and not activatable. Overrides the variant's colours.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description:
        "Shows a spinner and sets `aria-busy`. Stays focusable and keeps its accessible name — it is busy, not unavailable — but cannot be activated.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    label: {
      control: "text",
      description:
        "Accessible name, for when the visible content is not descriptive enough.",
      table: { category: "Accessibility" },
    },
    href: {
      control: "text",
      description:
        'Renders an anchor instead of a button. With `target="_blank"`, `rel="noopener noreferrer"` is set automatically.',
      table: { category: "Behaviour" },
    },
    target: {
      control: "inline-radio",
      options: [undefined, "_blank", "_self", "_parent", "_top"],
      description: "Only meaningful alongside `href`.",
      table: { category: "Behaviour" },
    },
    type: {
      control: "inline-radio",
      options: ["button", "submit", "reset"],
      description: "Native button type.",
      table: { category: "Behaviour" },
    },
    onClick: {
      action: "clicked",
      table: { category: "Behaviour" },
    },
  },
  args: {
    children: "دکمه تپسی",
    variant: "default",
    hierarchy: "primary",
    size: "md",
    disabled: false,
    loading: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Use the **Controls** panel to switch variant, hierarchy, size and state. The
 * theme, direction and all-four-themes toggles live in the toolbar above the
 * canvas.
 *
 * Only 8 of the 12 variant × hierarchy pairings exist in Figma, and the props
 * type enforces that — picking `elevated` or `cta` with a non-`primary`
 * hierarchy is a type error in real code, even though the controls here let you
 * try it.
 */
export const Playground: Story = {};
