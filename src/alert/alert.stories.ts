import { html, TemplateResult } from 'lit';
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

export default {
  title: 'Alert',
  component: 'tap-alert',
  argTypes: {
    alertContent: {
      control: 'text',
      description: 'Alert Content',
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
      description: 'Alert Title',
      defaultValue: '',
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
  variant?: 'success' | 'error' | 'info' | 'warning' | 'inverse';
  priority?: 'high' | 'low';
  alertTitle?: string;
}

const Template: Story<ArgTypes> = ({
  variant,
  alertContent,
  priority,
  alertTitle,
}) => {
  return html`
    <tap-alert
      id="alert-story"
      variant=${variant}
      priority=${priority}
      alert-title=${alertTitle}
    >
      ${alertContent}
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
};

export const Variants = VariantTemplate.bind({});
Variants.args = {
  priority: 'high',
};
