import { html, TemplateResult } from 'lit';
import { Meta } from '@storybook/web-components';
import '../button';
import './index.js';
import '@tapsioss/icons/dist/icons/circle-check-fill';

export default {
  title: 'Components/Modal',
  component: 'tap-modal',
  argTypes: {
    open: { control: 'boolean' },
    alignment: {
      control: { type: 'radio' },
      options: ['center', 'right'],
      description: 'Modal Alignment',
    },
    layout: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Modal Actions Layout',
    },
    leadingType: {
      control: { type: 'radio' },
      options: ['icon', 'image'],
      description: 'Modal Leading Type',
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  open: boolean;
  alignment: string;
  layout: string;
  leadingType: string;
}

const renderActions = (layout: string) => {
  if (layout === 'vertical') {
    return html`
      <div slot="actions" style="display: flex; flex-direction: column; gap: 12px">
        <tap-button tabindex="0" style="width:100%">عنوان دکمه</tap-button>
        <tap-button tabindex="0" style="width:100%" variant="ghost">عنوان دکمه</tap-button>
      </div>`;
  } else {
    return html`
      <div slot="actions" style="display: flex; gap: 12px">
        <tap-button tabindex="0" style="width:100%">عنوان دکمه</tap-button>
        <tap-button tabindex="0" style="width:100%" variant="ghost">عنوان دکمه</tap-button>
      </div>`;
  }
}

const renderModal = ({ alignment, open, layout, leadingType }: ArgTypes) => {
  if (leadingType === 'icon') {
    return html`
      <tap-modal 
      .open=${open} 
      .alignment=${alignment}
      title="عنوان را وارد کنید"
      description="این محل نوشتن توضیح این مودال است. لطفاً متن مورد نظر را اینجا بنویسید">
        <tap-icon-circle-check-fill 
          height="64" 
          width="64" 
          color="var(--tap-palette-green-300)" 
          slot="icon"></tap-icon-circle-check-fill>
        ${renderActions(layout)}
      </tap-modal>`
  } else {
    return html`
      <tap-modal 
      .open=${open} 
      .alignment=${alignment}
      image="https://picsum.photos/100"
      title="عنوان را وارد کنید"
      description="این محل نوشتن توضیح این مودال است. لطفاً متن مورد نظر را اینجا بنویسید">
        ${renderActions(layout)}
      </tap-modal>`;
  }
}

const Template: Story<ArgTypes> = ({ open, alignment, layout, leadingType }: ArgTypes) => html`
  ${renderModal({ open, alignment, layout, leadingType })}
`;

export const Modal = Template.bind({});

Modal.args = {
  open: true,
  alignment: 'right',
  layout: 'horizontal',
  leadingType: 'icon',
};
