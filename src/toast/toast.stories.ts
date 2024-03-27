import { html, TemplateResult } from "lit";
import "./index.js";
import "../button";
import ToastProps from "./types";
import { enqueueToast } from "./utils.js";

export default {
  title: "Toast",
  component: "tap-toast",
  argTypes: {
    message: {
      control: "text",
      description: "Toast Message",
    },
    color: {
      options: ["success", "error", "info", "inverse", "warning"],
      control: { type: "inline-radio" },
      description: "The toast color",
      defaultValue: `"inverse"`,
    },
    showDismissButton: {
      description: "Should the Dismiss button be visible?",
      control: { type: "boolean" },
      defaultValue: true,
    },
    autoHideDuration: {
      control: { type: "number" },
      description:
        "The duration of hiding the toast automatically (in milliseconds). ",
    },
    onOpen: {
      description: "The function that is called after opening the toast.",
      defaultValue: `undefined`,
    },
    onClose: {
      description: "The function that is called after closing the toast.",
      defaultValue: `undefined`,
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

const defaultProps: ToastProps = {
  message: "متن اسنک‌بار اینجا قرار می‌گیرد.",
  color: "inverse",
  showDismissButton: false,
};

const Template: Story<ToastProps> = ({
  color,
  message,
  showDismissButton,
  autoHideDuration,
  onClose,
  onOpen,
}: ToastProps) => {
  return html`
    <div dir="rtl">
      <tap-toast
        .color=${color}
        .message=${message}
        .showDismissButton=${showDismissButton}
        .autoHideDuration=${autoHideDuration}
        .onClose=${onClose}
        .onOpen=${onOpen}
      >
        ${message}
      </tap-toast>
    </div>
  `;
};

const ClickTemplate: Story<ToastProps> = ({
  color,
  message,
  showDismissButton,
  onClose,
  onOpen,
  autoHideDuration,
}: ToastProps) => {
  return html`
    <p>
      You can define your snackbar from <b>Controls</b> section and click on
      <b>Show Snackbar</b> button to see it. After clicking on this button, the
      <code>enqueueToast</code> function will be called like bellow:
    </p>
    <pre>
enqueueToast("${message}", {
  color,
  showDismissButton,
  autoHideDuration,
  onClose,
});
    </pre
    >
    <tap-button
      @click=${() =>
        enqueueToast(message, {
          color,
          showDismissButton,
          autoHideDuration,
          onClose,
          onOpen,
        })}
    >
      Show Snackbar
    </tap-button>
  `;
};

export const RawToast = Template.bind({});
RawToast.args = {
  ...defaultProps,
};

export const ShowDismissButton = Template.bind({});
ShowDismissButton.args = {
  ...defaultProps,
  showDismissButton: true,
  message: "با کلیک روی علامت ضربدر می‌توانید اسنک‌بار را ببندید.",
};

export const OpeningCallbackFunction = Template.bind({});
OpeningCallbackFunction.args = {
  ...defaultProps,
  onOpen: () => alert("The toast was opened!"),
};

export const ClosingCallbackFunction = Template.bind({});
ClosingCallbackFunction.args = {
  ...defaultProps,
  showDismissButton: true,
  onClose: () => alert("The toast was dismissed!"),
};

export const AutoHideToast = Template.bind({});
AutoHideToast.args = {
  ...defaultProps,
  autoHideDuration: 3000,
  message: "این اسنک‌بار بعد از ۳ ثانیه حذف می‌شود.",
};

export const ShowSnackbarOnClick = ClickTemplate.bind({});
ShowSnackbarOnClick.args = {
  ...defaultProps,
};
