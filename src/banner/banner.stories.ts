import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "../button/index.js";
import "./index.js";

export default {
  title: "Components/Banner",
  component: "tap-banner",
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
  <tap-banner
    heading="با ۱۶۳۰، تلفنی تپسی بگیر"
    description="درخواست خودرو بدون نیاز به اینترنت"
    image="https://able-media.tapsi.cab/statics/N31LNC95J6MCPIYB0D.jpg"
    background-color="rgb(255, 213, 194)"
    text-color="rgb(66, 46, 40)"
  >
    <tap-button size="small">دریافت تخفیف</tap-button>
  </tap-banner>

  <tap-banner
    variant="hero"
    heading="با ۱۶۳۰، تلفنی تپسی بگیر"
    description="درخواست خودرو بدون نیاز به اینترنت"
    image="https://able-media.tapsi.cab/statics/N31LNC95J6MCPIYB0D.jpg"
    background-color="rgb(255, 213, 194)"
    text-color="rgb(66, 46, 40)"
  >
    <tap-button
      size="small"
      slot="extra"
      >majid</tap-button
    >
    <tap-button size="small">دریافت تخفیف</tap-button>
  </tap-banner>
  <br />
  <tap-banner
    variant="hero"
    heading="با ۱۶۳۰، تلفنی تپسی بگیر"
    description="درخواست خودرو بدون نیاز به اینترنت"
    image="https://able-media.tapsi.cab/statics/N31LNC95J6MCPIYB0D.jpg"
    background-color="rgb(255, 213, 194)"
    text-color="rgb(66, 46, 40)"
  >
  </tap-banner>
`;

export const Banner = Template.bind({});

Banner.args = {};
