import { html, TemplateResult } from 'lit';
import './index.js';
import '../button/index.js';

export default {
  title: 'Banner',
  component: 'tap-banner',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
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
    <tap-button size="small" slot="extra">majid</tap-button>
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
