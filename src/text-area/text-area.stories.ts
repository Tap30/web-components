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
}

const Template: Story<ArgTypes> = ({ label, caption, placeholder }) => html`
  <tap-text-area label=${label} caption=${caption} placeholder=${placeholder}>
  </tap-text-area>
`;

export const TextArea = Template.bind({});

TextArea.args = {
  label: 'لیبل',
  caption: 'توضیحات',
  placeholder: 'متن',
};
