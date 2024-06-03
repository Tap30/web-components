import { html, TemplateResult } from 'lit';
import './index.js';
import '../button';
import {Meta} from "@storybook/web-components";

const toastVariants: string[] = [
  'success',
  'error',
  'info',
  'inverse',
  'warning',
];

export default {
  title: 'Components/Toast',
  component: 'tap-toast',
  argTypes: {
    toastContent: {
      control: 'text',
      description: 'Toast Content',
    },
    variant: {
      options: toastVariants,
      control: { type: 'inline-radio' },
      description: 'The toast variant',
      defaultValue: `"inverse"`,
    },
    showDismissButton: {
      description: 'Should the Dismiss button be visible?',
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

const defaultProps = {
  toastContent: 'toast text goes here!',
  showDismissButton: false,
};

interface ArgTypes {
  toastContent: string;
  variant?: 'success' | 'error' | 'info' | 'warning' | 'inverse';
  showDismissButton?: boolean;
}

const Template: Story<ArgTypes> = ({
  variant,
  toastContent,
  showDismissButton,
}) => {
  document.addEventListener('DOMContentLoaded', () => {
    const toastElement = document.getElementById('toast-story');
    toastElement?.addEventListener('dismiss', () => {
      toastElement.remove();
    });
  });

  return html`
    <tap-toast
      id="toast-story"
      variant=${variant}
      ?show-dismiss-button=${showDismissButton}
    >
      ${toastContent}
    </tap-toast>
  `;
};

const VariantTemplate: Story<{}> = () => {
  return html`
    ${toastVariants.map(
      (variant) => html` <tap-toast variant=${variant}>${variant}</tap-toast> `,
    )}
  `;
};

export const Simple = Template.bind({});
Simple.args = {
  toastContent: 'a simple toast',
};

export const Variants = VariantTemplate.bind({});
Variants.args = {};

export const DismissButton = Template.bind({});
DismissButton.args = {
  toastContent: 'A toast with dismiss button',
  showDismissButton: true,
};
