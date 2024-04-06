import {html, TemplateResult} from "lit";
import "./index.js";
import "../button";

export default {
  title: "Toast",
  component: "tap-toast",
  argTypes: {
    toastContent: {
      control: "text",
      description: "Toast Content",
    },
    variant: {
      options: ["success", "error", "info", "inverse", "warning"],
      control: { type: "inline-radio" },
      description: "The toast variant",
      defaultValue: `"inverse"`,
    },
    showDismissButton: {
      description: "Should the Dismiss button be visible?",
      control: { type: "boolean" },
      defaultValue: true,
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

const defaultProps = {
  toastContent: "toast text goes here!",
  showDismissButton: false,
};

interface ArgTypes {
  toastContent: string,
  variant?: 'success' | 'error' | 'info' | 'warning' | 'inverse',
  showDismissButton?: boolean,
}

const Template: Story<ArgTypes> = ({
  variant,
  toastContent,
  showDismissButton,
}) => {
  return html`
    <div>
      <tap-toast
        .variant=${variant}
        .showDismissButton=${showDismissButton}
      >
        ${toastContent}
      </tap-toast>
    </div>
  `;
};

export const Simple = Template.bind({});
Simple.args = {
  toastContent: "a simple toast",
};

export const Variants = Template.bind({});
Variants.args = {
  toastContent: "A toast with success variant",
  variant: 'success',
};

export const DismissButton = Template.bind({});
DismissButton.args = {
  toastContent: "A toast with dismiss button",
  showDismissButton: true,
};
