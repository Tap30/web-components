import {html, nothing, TemplateResult} from "lit";
import "./index";
import "../button";
import "../icons";
import "../checkbox";
import "../radio";
import "../badge";
import "../avatar";

export default {
  title: "Route",
  component: "tap-route",
  argTypes: {
    size: {
      description: "Route size",
      control: {type: "inline-radio"},
      options: ['standard', 'compact'],
      defaultValue: 'standard',
    },
    leadingIcon: {
      description: "Route leading icon type",
      control: {type: "select"},
      options: ['circle', 'square', 'plus'],
      defaultValue: 'circle',
    },
    ordinal: {
      description: "Route position in order",
      control: {type: "select"},
      options: ['first', 'middle', 'last'],
      defaultValue: 'first',
    },
    editable: {
      description: "Editable (Show Edit icon)",
      control: {type: "boolean"},
      defaultValue: false,
    },
    disabled: {
      description: "Disable Row",
      control: {type: "boolean"},
      defaultValue: false,
    },
    content: {
      description: "Route content slot.",
      control: {type: "select"},
      options: ['standard', 'reverse', 'address', 'customized', 'nothing'],
      defaultValue: 'nothing',
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  size: 'standard' | 'compact';
  leadingIcon: 'circle' | 'square' | 'plus';
  ordinal: 'first' | 'middle' | 'last';
  editable: boolean;
  disabled: boolean;
  content: unknown;
}

const renderExampleContentSlot = (example: unknown) => {
  switch (example) {
    case "customized":
      return html`<h1 slot="content">any content you want! 😉</h1>`;
    case "standard":
      return html`
        <div slot="content">
          <h3 style="margin: 0;">عنوان را وارد کنید</h3>
          <p style="margin: 0;">توضیحات لیست</p>
        </div>`
    case "reverse":
      return html`
        <div slot="content">
          <p style="margin: 0;">عنوان را وارد کنید</p>
          <h3 style="margin: 0;">توضیحات لیست</h3>
        </div>`
    case "address":
      return html`<p slot="content">سعادت‌آباد، بلوار بهزاد</p>`
    default:
      return nothing;
  }
}

const Template: Story<ArgTypes> = ({size, leadingIcon, ordinal, editable, disabled, content}: ArgTypes) => html`
  <tap-route
    size=${size}
    leading-icon=${leadingIcon}
    ordinal=${ordinal}
    ?editable=${editable}
    ?disabled=${disabled}
  >
    ${renderExampleContentSlot(content)}
  </tap-route>
`;

export const Route = Template.bind({});

Route.args = {
  size: 'standard',
  leadingIcon: 'circle',
  ordinal: 'first',
  editable: false,
  disabled: false,
  content: 'standard',
};
