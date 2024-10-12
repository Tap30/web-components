import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import { ifDefined } from "lit/directives/if-defined";
import "../tooltip";
import "./index.js";

export default {
  title: "Components/Bottom Sheet",
  component: "tap-bottom-sheet",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controls the visibility of the bottom sheet. If true, the bottom sheet is visible.",
    },
    dismissible: {
      control: "boolean",
      description:
        "Determines whether the bottom sheet can be dismissed by the user. If true, a close button is displayed, allowing the bottom sheet to be closed.",
    },
    hasDimmer: {
      control: "boolean",
      description: "Controls the presence of a dimmer overlay.",
    },
    title: {
      control: "text",
      description:
        "Specifies the title displayed in the header of the bottom sheet.",
    },
    expanded: {
      control: "boolean",
      description:
        "If true, the bottom sheet expands to 90% of the viewport height (90vh).",
    },
    showGrabber: {
      control: "boolean",
      description: "Controls the visibility of the grabber element.",
    },
  },
  decorators: [
    (Story: () => TemplateResult) => {
      return html`
        <style>
          body {
            overflow: hidden;
          }
        </style>
        ${Story()}
      `;
    },
  ],
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  open?: boolean;
  disappear?: boolean;
  dismissible?: boolean;
  hasDimmer?: boolean;
  title?: string;
  expanded?: boolean;
  showGrabber?: boolean;
}

const Template: Story<ArgTypes> = ({ title, open, hasDimmer }) => {
  return html` <tap-bottom-sheet
    title=${ifDefined(title)}
    ?open=${open}
    ?has-dimmer=${hasDimmer}
  >
    <div
      slot="bottom-sheet-body"
      style="padding: 2rem; height: 100vh; overflow-x: auto; width: 100%; direction: ltr;"
    >
      <div>This is body.</div>
    </div>
  </tap-bottom-sheet>`;
};

export const Simple = Template.bind({});
Simple.args = {
  title: "عنوان",
  open: true,
  hasDimmer: true,
};
