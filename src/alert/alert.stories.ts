import {html, TemplateResult} from "lit";
import "./index.js";
import "../button";

const alertVariants: string[] = ["success", "error", "info", "inverse", "warning"]
// TODO: fix

export default {
  title: "Toast",
  component: "tap-alert",
  argTypes: {
    alertContent: {
      control: "text",
      description: "Toast Content",
    },
    variant: {
      options: alertVariants,
      control: { type: "inline-radio" },
      description: "The alert variant",
      defaultValue: `"inverse"`,
    },
    showDismissButton: {
      description: "Should the Dismiss button be visible?",
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

const defaultProps = {
  alertContent: "alert text goes here!",
  showDismissButton: false,
};

interface ArgTypes {
  alertContent: string,
  variant?: 'success' | 'error' | 'info' | 'warning' | 'inverse',
  showDismissButton?: boolean,
}

const Template: Story<ArgTypes> = ({
  variant,
  alertContent,
  showDismissButton,
}) => {

  document.addEventListener('DOMContentLoaded', () => {
    const alertElement = document.getElementById('alert-story');
    alertElement?.addEventListener('dismiss', () => {
      alertElement.remove();
    });
  });

  return html`
    <tap-alert
      id="alert-story"
      variant=${variant}
      ?show-dismiss-button=${showDismissButton}
    >
      ${alertContent}
    </tap-alert>
  `;
};

const VariantTemplate: Story<{}> = () => {
  return html`
    ${alertVariants.map((variant) => html`
      <tap-alert variant=${variant}>${variant}</tap-alert>
    `)}
  `;
};

export const Simple = Template.bind({});
Simple.args = {
  alertContent: "a simple alert",
};

export const Variants = VariantTemplate.bind({});
Variants.args = {};

export const DismissButton = Template.bind({});
DismissButton.args = {
  alertContent: "A alert with dismiss button",
  showDismissButton: true,
};
