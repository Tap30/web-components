import { Meta } from "@storybook/web-components";
import { TemplateResult, html } from "lit";
import '../chip';
import './index.js';
import '@tapsioss/icons/dist/icons/default'

export default {
  title: 'Components/Chip Group',
  component: 'tap-chip-group',
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes { }

const Template: Story<ArgTypes> = () => html`
  <tap-chip-group size="md">
    <tap-chip hasIcon disabled>
      <span>اینترنت</span>
      <tap-icon-default slot="icon"></tap-icon-default>
    </tap-chip>
    <tap-chip hasIcon>
      <span>اینترنت</span>
      <tap-icon-default slot="icon"></tap-icon-default>
    </tap-chip>
    <tap-chip hasIcon>
      <span>اینترنت</span>
      <tap-icon-default slot="icon"></tap-icon-default>
    </tap-chip>
    <tap-chip selected>
      اینترنت
    </tap-chip>
  </tap-chip-group>
`;

export const ChipGroup = Template.bind({});

ChipGroup.args = {}