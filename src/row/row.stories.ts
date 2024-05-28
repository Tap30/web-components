import { html, nothing, TemplateResult } from 'lit';
import './index';
import '../button';
import '../icons';
import '../checkbox';
import '../radio';
import '../badge';
import '../avatar';

export default {
  title: 'Row',
  component: 'tap-row',
  argTypes: {
    size: {
      description: 'Row size',
      control: { type: 'inline-radio' },
      options: ['standard', 'compact'],
      defaultValue: 'standard',
    },
    navigable: {
      description: 'Navigable (Show Chevron)',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    leading: {
      description: 'Row leading slot',
      control: { type: 'select' },
      options: ['icon', 'nothing', 'radio', 'checkbox', 'avatar'],
      defaultValue: 'nothing',
    },
    trailing: {
      description: 'Row trailing slot',
      control: { type: 'select' },
      options: ['icon', 'button', 'badge', 'ghost-button', 'price', 'nothing'],
      defaultValue: 'nothing',
    },
    content: {
      description: 'Row content slot.',
      control: { type: 'select' },
      options: ['standard', 'reverse', 'address', 'customized', 'nothing'],
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
  size: 'standard' | 'compact';
  leading: unknown;
  trailing: unknown;
  content: unknown;
  navigable: boolean;
}

const renderExampleSideSlot = (
  example: unknown,
  type: 'leading' | 'trailing',
) => {
  switch (example) {
    case 'badge':
      return html` <tap-badge
        slot=${type}
        value="۱"
        variant="error"
        type="numeral"
      ></tap-badge>`;
    case 'icon':
      return html` <tap-icon-default slot=${type}></tap-icon-default>`;
    case 'button':
      return html` <tap-button slot=${type}>Button</tap-button>`;
    case 'ghost-button':
      return html` <tap-button variant="ghost" slot=${type}
        >Button</tap-button
      >`;
    case 'checkbox':
      return html` <tap-checkbox slot=${type}></tap-checkbox>`;
    case 'radio':
      return html` <tap-radio slot=${type}></tap-radio>`;
    case 'avatar':
      return html` <tap-avatar
        size="small"
        slot=${type}
        image="https://picsum.photos/100"
      ></tap-avatar>`;
    case 'price':
      return html`<p slot=${type}>۱۵۷٬۰۰۰ تومان</p>`;
    default:
      return nothing;
  }
};

const renderExampleContentSlot = (example: unknown) => {
  switch (example) {
    case 'customized':
      return html`<h1 slot="content">any content you want! 😉</h1>`;
    case 'standard':
      return html`<div slot="content">
        <h3 style="margin: 0;">عنوان را وارد کنید</h3>
        <p style="margin: 0;">توضیحات لیست</p>
      </div>`;
    case 'reverse':
      return html`<div slot="content">
        <p style="margin: 0;">عنوان را وارد کنید</p>
        <h3 style="margin: 0;">توضیحات لیست</h3>
      </div>`;
    case 'address':
      return html`<p slot="content">سعادت‌آباد، بلوار بهزاد</p>`;
    default:
      return nothing;
  }
};

const Template: Story<ArgTypes> = ({
  size,
  leading,
  trailing,
  navigable,
  content,
}: ArgTypes) => html`
  <tap-row ?navigable=${navigable} size=${size}>
    ${renderExampleSideSlot(leading, 'leading')}
    ${renderExampleContentSlot(content)}
    ${renderExampleSideSlot(trailing, 'trailing')}
  </tap-row>
`;

export const Row = Template.bind({});

Row.args = {
  size: 'standard',
  leading: 'icon',
  trailing: 'ghost-button',
  navigable: false,
  content: 'standard',
};
