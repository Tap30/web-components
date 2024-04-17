import { html, TemplateResult } from "lit";
import "./index.ts";

export default {
  title: "TextArea",
  component: "tap-text-area",
  argTypes: {
    label: {
      control: 'text',
      description: 'label',
    }
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
  <tap-text-area label=${args.label} caption=${args.caption} placeholder=${args.placeholder} ?disabled=${args.disabled} ?error=${args.error}>
  </tap-text-area>
`;

export const TextArea = Template.bind({});

TextArea.args = {
  label: 'لیبل',
  caption: 'توضیحات',
  placeholder: 'متن',
  disabled: false,
  error: false,
};
