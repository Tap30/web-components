import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "../badge";
import "../button";
import "./index.js";

export default {
  title: "Components/Badge",
  component: "tap-badge-wrapper",
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArgTypes {}

const Template: Story<ArgTypes> = () => html`
  <tap-badge-wrapper>
    <tap-badge
      value="‍۱۰"
      slot="badge"
      variant="info"
    ></tap-badge>
    <tap-button>عنوان دکمه</tap-button>
  </tap-badge-wrapper>
`;

export const BadgeWrapper = Template.bind({});

BadgeWrapper.args = {};
