import { type Meta, type StoryObj } from "@storybook/react-vite";
import { ChevronLeft, CircleCross } from "@tapsioss/react-icons";
import { Row } from "@tapsioss/react-ui";
import { fn } from "storybook/test";

// One story, every prop a control — see `button.stories.tsx` for the
// convention.

const meta = {
  title: "React UI/Row",
  component: Row,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    Story => (
      <div style={{ maxInlineSize: "360px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "The row's main text — Figma's `labelText`.",
      table: { category: "Content" },
    },
    description: {
      control: "text",
      description:
        "Secondary text under the label — Figma's `descriptionText`. Leave empty to omit it.",
      table: { category: "Content" },
    },
    leading: {
      control: "boolean",
      mapping: { true: <CircleCross />, false: undefined },
      description:
        "Rendered at the start of the row, in a 24px box. Any `ReactNode`; the control here just toggles a sample icon.",
      table: { category: "Content" },
    },
    trailing: {
      control: "inline-radio",
      options: ["none", "icon", "chevron", "both"],
      mapping: {
        none: undefined,
        icon: <CircleCross />,
        chevron: <ChevronLeft />,
        both: (
          <>
            <CircleCross />
            <ChevronLeft />
          </>
        ),
      },
      description:
        "Rendered at the end of the row. Figma's navigation chevron is not built in — pass it here.",
      table: { category: "Content" },
    },
    reversed: {
      control: "boolean",
      description:
        "Figma's `Content=Reversed`: the label becomes a small, muted overline and the description the prominent value.",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
    badge: {
      control: "boolean",
      description:
        "A notification dot on the leading slot. Has no effect without `leading`.",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
    divider: {
      control: "boolean",
      description: "The separator under the content and trailing.",
      table: { category: "Appearance", defaultValue: { summary: "true" } },
    },
    textOverflow: {
      control: "inline-radio",
      options: ["wrap", "ellipsis"],
      description:
        "What the label and description do when they do not fit: `wrap` onto more lines (the row grows), or stay on one line and truncate with `…` (the row keeps its height).",
      table: {
        category: "Appearance",
        type: { summary: '"wrap" | "ellipsis"' },
        defaultValue: { summary: "wrap" },
      },
    },
    href: {
      control: "text",
      description:
        'Renders the row as an `<a>`. Wins over `onClick` and `render`. With `target="_blank"`, `rel="noopener noreferrer"` is set automatically.',
      table: { category: "Behaviour" },
    },
    target: {
      control: "inline-radio",
      options: [undefined, "_blank", "_self", "_parent", "_top"],
      description: "Only meaningful alongside `href`.",
      table: { category: "Behaviour" },
    },
    onClick: {
      // A toggle, not `action`: an action arg is always a function, which
      // would make every row in this story a button.
      control: "boolean",
      mapping: { true: fn(), false: undefined },
      description:
        'Renders the row as a `<button type="button">` (unless `href` makes it a link). Wins over `render`. The control toggles a handler that logs to the Actions panel.',
      table: { category: "Behaviour" },
    },
  },
  args: {
    label: "عنوان",
    description: "توضیحات",
    leading: true,
    trailing: "icon",
    reversed: false,
    badge: false,
    divider: true,
    textOverflow: "wrap",
  },
} satisfies Meta<typeof Row>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Use the **Controls** panel to toggle the slots, the reversed emphasis, the
 * badge and the divider. The row picks its own element: an `<a>` with `href`,
 * a `<button>` with `onClick` (toggle it; the Actions panel logs clicks), otherwise a
 * `<div>` — which Base UI's `render` prop can turn into an `<li>` in code.
 */
export const Playground: Story = {};
