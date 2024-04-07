import { html, TemplateResult } from "lit";
import "./index.js";

export default {
  title: "Avatar",
  component: "tap-avatar",
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-avatar> </tap-avatar>
`;

export const Avatar = Template.bind({});

Avatar.args = {};
