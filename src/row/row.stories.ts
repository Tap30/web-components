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
    divider: {
      description: "Should show the divider?",
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
      options: ['icon', 'button', 'badge', 'ghost-button', 'price', 'chevron', 'nothing'],
      defaultValue: 'nothing',
    },
    content: {
      description: "Row content slot. This can be used when you want to override the default row content. By passing a content slot, the `title` and `subtitle` will be hidden.",
      control: {type: "select"},
      options: ['customized', 'nothing'],
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
  divider: boolean;
  size: 'standard' | 'compact';
  title: string;
  subtitle: string;
  leading: unknown;
  content: 'nothing' | 'customized';
  trailing: unknown;
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
    case 'chevron':
      return html`
        <svg slot=${type} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M13.9143 8.46451L10.3794 11.9993L13.9143 15.5356L12.5 16.9498L7.55029 12L12.5 7.05029L13.9143 8.46451Z"
                fill="#B1B2B2"/>
        </svg>
      `;
    default:
      return nothing;
  }
}


const renderExampleContentSlot = (example: unknown) => {
  if (example === "customized") {
    return html`<h1 slot="content">any content you want! 😉</h1>`;
  }
  return nothing;
}

const Template: Story<ArgTypes> = ({divider, size, title, subtitle, leading, trailing, content}: ArgTypes) => html`
  <tap-row ?divider=${divider} size=${size} title=${title} subtitle=${subtitle}>
    ${renderExampleSideSlot(leading, 'leading')}
    ${renderExampleContentSlot(content)}
    ${renderExampleSideSlot(trailing, 'trailing')}
  </tap-row>
`;

export const Row = Template.bind({});

Row.args = {
  divider: false,
  size: 'standard',
  title: 'title',
  subtitle: 'subtitle',
  leading: 'icon',
  trailing: 'ghost-button',
  content: 'nothing',
};
