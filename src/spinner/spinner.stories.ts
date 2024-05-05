import { html, TemplateResult } from "lit";
import "./index.js";

const spinnerVariants: string[] = ["primary", "inverse"];

export default {
  title: "Spinner",
  component: "tap-spinner",
  argTypes: {
    variant: {
      description: "Spinner variant",
      options: spinnerVariants,
      control: {type: "select"},
    },
  },
  decorators: [
    (Story: () => TemplateResult) => (
      html`
        <div style="background: #0000001f; height: 100vh; margin: -1rem;">
          ${Story()}
        </div>`
    ),
  ],
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  variant:
  | "primary"
  | "inverse",
}

const Template: Story<ArgTypes> = ({variant}: ArgTypes) => html`
  <tap-spinner variant=${variant}></tap-spinner>
`;

export const Spinner = Template.bind({});

Spinner.args = {};
