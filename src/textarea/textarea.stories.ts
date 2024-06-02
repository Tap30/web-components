import { html, TemplateResult } from "lit";
import "./index.js";

export default {
  title: "TextArea",
  component: "tap-textarea",
  argTypes: {
    label: {
      control: 'text',
      description: 'label',
    },
    caption: {
      control: 'text',
      description: 'hints on input'
    },
    placeholder: {
      control: 'text',
      description: 'placeholder'
    },
    disabled: {
      control: 'boolean',
      description: 'is input editable?',
    },
    error: {
      control: 'boolean',
      description: 'does the input value have an error?',
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string,
  caption: string,
  placeholder: string,
  disabled: boolean,
  error: boolean,
}

const Template: Story<ArgTypes> = ({ ...args }: ArgTypes) => html`
  <tap-textarea label=${args.label} caption=${args.caption} placeholder=${args.placeholder} ?disabled=${args.disabled} ?error=${args.error}>
  </tap-textarea>
`;

export const TextArea = Template.bind({});

TextArea.args = {
  label: 'لیبل',
  caption: 'توضیحات',
  placeholder: 'متن',
  disabled: false,
  error: false,
};
