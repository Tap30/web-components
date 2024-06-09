import { html, TemplateResult, nothing } from 'lit';
import './index.js';
import '../button';

const noticeVariants: string[] = [
  'success',
  'error',
  'info',
  'warning',
  'inverse',
];

const noticePriorities: string[] = ['high', 'low'];

type Actions = 'nothing' | 'button' | 'any';
type Variants = 'success' | 'error' | 'info' | 'warning' | 'inverse';

export default {
  title: 'Notice',
  component: 'tap-notice',
  argTypes: {
    noticeContent: {
      control: 'text',
      description: 'Notice content',
    },
    variant: {
      options: noticeVariants,
      control: { type: 'inline-radio' },
      description: 'The notice variant',
      defaultValue: `inverse`,
    },
    priority: {
      options: noticePriorities,
      control: { type: 'inline-radio' },
      description: 'The notice priority',
      defaultValue: `low`,
    },
    noticeTitle: {
      control: 'text',
      description: 'Notice title',
      defaultValue: '',
    },
    actions: {
      description:
        'Actions section of the Notice: These actions are passed to the Notice component as an slot named `actions`',
      control: { type: 'select' },
      options: ['button', 'any', 'nothing'],
      defaultValue: 'nothing',
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  noticeContent: string;
  variant?: Variants;
  priority?: 'high' | 'low';
  noticeTitle?: string;
  actions?: Actions;
}

const renderActionsSection = (actions?: Actions) => {
  if (actions === 'button')
    return html`<div slot="actions" style="margin-top: 8px">
      <tap-button varinat="ghost">button</tap-button>
    </div>`;
  if (actions === 'any')
    return html`<p slot="actions" style="margin-top: 8px">
      your actions slot goes here, and you are responsible of styling it
    </p>`;
  return nothing;
};

const Template: Story<ArgTypes> = ({
  variant,
  noticeContent,
  priority,
  noticeTitle,
  actions,
}) => {
  return html`
    <tap-notice
      id="notice-story"
      variant=${variant}
      priority=${priority}
      notice-title=${noticeTitle}
    >
      ${noticeContent} ${renderActionsSection(actions)}
    </tap-notice>
  `;
};

const VariantTemplate: Story<{ priority?: 'low' | 'high' }> = ({
  priority,
}) => {
  return html`
    <div style="display: flex; flex-direction: column; gap: 16px">
      ${noticeVariants.map(
        (variant) => html`
          <tap-notice variant=${variant} priority=${priority} notice-title="title"
            >unchangeable ${variant}${priority ? `-${priority}` : ''}</tap-notice
          >
        `,
      )}
    </div>
  `;
};

export const Simple = Template.bind({});
Simple.args = {
  noticeContent:
    'Please notice this text here. It is important and the user should pay attention. Default variant of the Notice component is `inverse` and its default priority is `high`. What you see is a customized `info-low` Notice/Notice. Good luck using this component!',
  noticeTitle: 'Title',
  variant: 'info',
  priority: 'low',
  actions: 'nothing',
};

export const Variants = VariantTemplate.bind({});
Variants.args = {
  priority: 'high',
};
