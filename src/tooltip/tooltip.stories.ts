import { html, TemplateResult } from 'lit';
import './index.js';
import '../tooltip';

export default {
  title: 'Tooltip',
  component: 'tap-tooltip',
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text displayed inside the tooltip.',
    },
    width: {
      control: 'text',
      description: 'The width of the tooltip container.',
    },
    placement: {
      control: {
        type: 'select',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end',
        ],
      },
      description: 'The placement of the tooltip relative to its target.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Should the Dismiss button be visible?',
    },
    arrowOffset: {
      control: 'text',
      description:
        "The arrowOffset determines the distance of the tooltip arrow from the top or left of the container, depending on the tooltip's placement.",
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string;
  width: string;
  placement: string;
  dismissible: boolean;
  arrowOffset: string;
}

const Template: Story<ArgTypes> = ({
  width,
  label,
  placement,
  dismissible,
  arrowOffset,
}) => {
  return html`
    <tap-tooltip
      width=${width}
      placement=${placement}
      dismissible=${dismissible}
      arrow-offset=${arrowOffset}
    >
      <span slot="label">${label}</span>
      <div
        slot="target-element"
        style="width: 80px;
          height: 80px;
          border: 2px dashed #999;
          position: relative;
          left: 80px;
          top: 80px;"
      ></div>
    </tap-tooltip>
  `;
};

export const Simple = Template.bind({});
Simple.args = {
  label: 'عنوان',
  placement: 'left',
  dismissible: true,
};

export const CustomArrowOffset = Template.bind({});
CustomArrowOffset.args = {
  label: 'عنوان',
  placement: 'top-start',
  dismissible: true,
  arrowOffset: '15px',
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  label: 'راهنما با عرض ثابت!',
  placement: 'bottom',
  dismissible: true,
  width: '80px',
};
