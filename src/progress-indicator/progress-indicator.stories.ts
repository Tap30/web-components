import { html, TemplateResult } from "lit";
import "./index.js";

export default {
  title: "Progress Indicator",
  component: "tap-progress-indicator",
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-progress-indicator></tap-progress-indicator>
`;

export const ProgressIndicator = Template.bind({});

ProgressIndicator.args = {};
