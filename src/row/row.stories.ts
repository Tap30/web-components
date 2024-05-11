import {html, nothing, TemplateResult} from "lit";
import "./index";
import "../button";
import "../icons";
import "../badge";

export default {
  title: "Row",
  component: "tap-row",
  argTypes: {
    size: {
      description: "Row size",
      control: {type: "inline-radio"},
      options: ['standard', 'compact'],
      defaultValue: 'standard',
    },
    title: {
      description: "Row title",
      control: {type: "text"},
    },
    subtitle: {
      description: "Row subtitle",
      control: {type: "text"},
    },
    navigable: {
      description: "Navigable (Show Chevron)",
      control: {type: "boolean"},
      defaultValue: false,
    },
    leading: {
      description: "Row leading slot",
      control: {type: "select"},
      options: ['icon', 'nothing'],
      defaultValue: 'nothing',
    },
    trailing: {
      description: "Row trailing slot",
      control: {type: "select"},
      options: ['icon', 'button', 'badge', 'ghost-button', 'price', 'nothing'],
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
  title: string;
  subtitle: string;
  leading: unknown;
  trailing: unknown;
  navigable: boolean;
}

const renderExampleSideSlot = (example: unknown, type: 'leading' | 'trailing') => {
  switch (example) {
    case 'badge':
      return html`<tap-badge slot=${type} value="۱" variant="error" type="numeral"></tap-badge>`;
    case 'icon':
      return html`<tap-icon-default slot=${type}></tap-icon-default>`;
    case 'button':
      return html`<tap-button slot=${type}>Button</tap-button>`;
    case 'ghost-button':
      return html`<tap-button variant="ghost" slot=${type}>Button</tap-button>`;
    case 'price':
      return html`<p slot=${type}>۱۵۷٬۰۰۰ تومان</p>`;
    default:
      return nothing;
  }
}

const Template: Story<ArgTypes> = ({size, title, subtitle, leading, trailing, navigable}: ArgTypes) => html`
  <tap-row ?navigable=${navigable} size=${size} title=${title} subtitle=${subtitle}>
    ${renderExampleSideSlot(leading, 'leading')}
    ${renderExampleSideSlot(trailing, 'trailing')}
  </tap-row>
`;

export const Row = Template.bind({});

Row.args = {
  size: 'standard',
  title: 'title',
  subtitle: 'subtitle',
  leading: 'icon',
  trailing: 'ghost-button',
  navigable: false,
};
