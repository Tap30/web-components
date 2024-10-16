import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "../bottom-navigation-item/index.js";
import "./index.js";

import "@tapsioss/icons/dist/icons/coupon";
import "@tapsioss/icons/dist/icons/coupon-fill";
import "@tapsioss/icons/dist/icons/person";
import "@tapsioss/icons/dist/icons/person-fill";
import "@tapsioss/icons/dist/icons/spark";
import "@tapsioss/icons/dist/icons/spark-fill";
import "@tapsioss/icons/dist/icons/square-grid-rounded";
import "@tapsioss/icons/dist/icons/square-grid-rounded-fill";

export default {
  title: "Components/Bottom Navigation",
  component: "tap-bottom-navigation",
  subcomponents: { "Bottom Navigation Item": "tap-bottom-navigation-item" },
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
