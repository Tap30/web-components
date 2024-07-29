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
    icon: {
      description: 'Empty State Icon Slot',
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
  icon: unknown;
}

const renderExampleIconSlot = (
  example: unknown,
) => {
  switch (example) {
    case 'success':
      return html` <tap-icon-circle-check-fill 
      height="64" 
      width="64" 
      color="var(--tap-palette-green-300)" 
      slot="icon"></tap-icon-circle-check-fill>`;
    case 'custom':
      return html` <tap-avatar
      size="large"
      slot="icon"
      image="https://picsum.photos/100"
    ></tap-avatar>`;
    case 'person':
      return html` <tap-icon-person-two 
      height="64" 
      width="64" 
      slot="icon"></tap-icon-person-two>`;
    default:
      return html` <tap-icon-default 
      slot="icon" 
      width="64" 
      height="64"></tap-icon-default>`;
  }
};

const Template: Story<ArgTypes> = ({ icon }: ArgTypes) => html`
  <tap-empty-state 
    title="عنوان را وارد کنید"
    description="توضیحات مربوط به عنوان را اینجا وارد کنید. توضیحات مربوط به عنوان را اینجا وارد کنید">
    ${renderExampleIconSlot(icon)}
    <tap-button slot="actions">کپی لینک دعوت</tap-button>
  </tap-empty-state>
`;

export const EmptyState = Template.bind({});

EmptyState.args = {
  icon: '',
};
