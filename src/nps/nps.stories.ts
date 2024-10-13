import { spreadProps } from "@open-wc/lit-helpers";
import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "./index.js";

export default {
  title: "Components/Nps",
  component: "tap-nps",
  argTypes: {
    min: {
      control: "number",
      defaultValue: 0,
    },
    max: {
      control: "number",
      defaultValue: 10,
    },
    value: {
      control: "number",
      defaultValue: 2,
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

type ArgTypes = {
  min: number;
  max: number;
};

const defaultProps: ArgTypes = {
  min: 0,
  max: 10,
};

const Template: Story<ArgTypes> = props => html`
  <tap-nps ${spreadProps(props)}></tap-nps>
`;

export const Nps = Template.bind({});

Nps.args = defaultProps;
