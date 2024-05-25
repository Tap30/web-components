import { html, TemplateResult, nothing } from 'lit';
import './index.js';
import '../button';

const alertVariants: string[] = [
  'success',
  'error',
  'info',
  'warning',
  'inverse',
];

const alertPriorities: string[] = ['high', 'low'];
// TODO: fix

type Actions = 'nothing' | 'button' | 'any';
type Variants = 'success' | 'error' | 'info' | 'warning' | 'inverse';

export default {
  title: 'Alert',
  component: 'tap-alert',
  argTypes: {
    alertContent: {
      control: 'text',
      description: 'Alert content',
    },
    variant: {
      options: alertVariants,
      control: { type: 'inline-radio' },
      description: 'The alert variant',
      defaultValue: `inverse`,
    },
    priority: {
      options: alertPriorities,
      control: { type: 'inline-radio' },
      description: 'The alert priority',
      defaultValue: `low`,
    },
    alertTitle: {
      control: 'text',
      description: 'Alert title',
      defaultValue: '',
    },
    actions: {
      description:
        'Actions section of the Alert: These actions are passed to the Alert component as an slot named `actions`',
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
  alertContent: string;
  variant?: Variants;
  priority?: 'high' | 'low';
  alertTitle?: string;
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
  alertContent,
  priority,
  alertTitle,
  actions,
}) => {
  return html`
    <tap-alert
      id="alert-story"
      variant=${variant}
      priority=${priority}
      alert-title=${alertTitle}
    >
      ${alertContent} ${renderActionsSection(actions)}
    </tap-alert>
  `;
};

const VariantTemplate: Story<{ priority?: 'low' | 'high' }> = ({
  priority,
}) => {
  return html`
    <div style="display: flex; flex-direction: column; gap: 16px">
      ${alertVariants.map(
        (variant) => html`
          <tap-alert variant=${variant} priority=${priority} alert-title="title"
            >unchangeable ${variant}${priority ? `-${priority}` : ''}</tap-alert
          >
        `,
      )}
    </div>
  `;
};

export const Simple = Template.bind({});
Simple.args = {
  alertContent:
    'Please notice this text here. It is important and the user should pay attention. Default variant of the Alert component is `inverse` and its default priority is `high`. What you see is a customized `info-low` Alert/Notice. Good luck using this component!',
  alertTitle: 'Title',
  variant: 'info',
  priority: 'low',
  actions: 'nothing',
};

export const Variants = VariantTemplate.bind({});
Variants.args = {
  priority: 'high',
};
