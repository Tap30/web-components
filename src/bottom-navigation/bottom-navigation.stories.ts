import { html, TemplateResult } from 'lit';
import './index.js';
import '../bottom-navigation-item/index.js';
import '../icons/index.js';

export default {
  title: 'Bottom Navigation',
  component: 'tap-bottom-navigation',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-bottom-navigation>
    <tap-bottom-navigation-item>
      پروفایل
      <tap-icon-person slot="icon"></tap-icon-person>
      <tap-icon-person-fill slot="active-icon"></tap-icon-person-fill>
    </tap-bottom-navigation-item>
    <tap-bottom-navigation-item>
      باشگاه مشتریان
      <tap-icon-spark slot="icon"></tap-icon-spark>
      <tap-icon-spark-fill slot="active-icon"></tap-icon-spark-fill>
    </tap-bottom-navigation-item>
    <tap-bottom-navigation-item>
      تخفیف‌ها
      <tap-icon-coupon slot="icon"></tap-icon-coupon>
      <tap-icon-coupon-fill slot="active-icon"></tap-icon-coupon-fill>
    </tap-bottom-navigation-item>
    <tap-bottom-navigation-item>
      سرویس‌ها
      <tap-icon-square-grid-rounded slot="icon"></tap-icon-square-grid-rounded>
      <tap-icon-square-grid-rounded-fill
        slot="active-icon"
      ></tap-icon-square-grid-rounded-fill>
    </tap-bottom-navigation-item>
  </tap-bottom-navigation>
`;

export const BottomNavigation = Template.bind({});

BottomNavigation.args = {};
