import { html, TemplateResult } from "lit";
import './index';
import '../button';
import '../icons';
import '../avatar';
import { Meta } from "@storybook/web-components";

export default {
  title: 'Components/EmptyState',
  component: 'tap-empty-state',
  argTypes: {
    leading: {
      description: 'Empty State Leading Slot',
      control: { type: 'select' },
      options: ['default', 'person', 'success', 'custom'],
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  leading: unknown;
}

const renderExampleLeadingSlot = (
  example: unknown,
) => {
  switch (example) {
    case 'success':
      return html` <tap-icon-circle-check-fill 
      height="64" 
      width="64" 
      color="var(--tap-palette-green-300)" 
      slot="leading"></tap-icon-circle-check-fill>`;
    case 'custom':
      return html` <tap-avatar
      size="large"
      slot="leading"
      image="https://picsum.photos/100"
    ></tap-avatar>`;
    case 'person':
      return html` <tap-icon-person-two 
      height="64" 
      width="64" 
      slot="leading"></tap-icon-person-two>`;
    default:
      return html` <tap-icon-default 
      slot="leading" 
      width="64" 
      height="64"></tap-icon-default>`;
  }
};

const Template: Story<ArgTypes> = ({ leading }: ArgTypes) => html`
  <tap-empty-state>
    ${renderExampleLeadingSlot(leading)}
    <div slot="content">
      <h3 style="margin: 0;">عنوان را وارد کنید</h3>
      <p style="margin: 8px 0 0 0;">توضیحات مربوط به عنوان را اینجا وارد کنید. توضیحات مربوط به عنوان را اینجا وارد کنید</p>
    </div>
    <tap-button slot="trailing">کپی لینک دعوت</tap-button>
  </tap-empty-state>
`;

export const EmptyState = Template.bind({});

EmptyState.args = {
  leading: '',
};
