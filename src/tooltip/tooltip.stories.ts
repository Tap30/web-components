import {html, TemplateResult} from "lit";
import "./index.js";
import "../tooltip";

export default {
  title: "Tooltip",
  component: "tap-tooltip",
  argTypes: {
    
  },
  decorators: [
    (Story: () => TemplateResult) => (
      html`<div
      id="reference"
      style="width: 80px;
      height: 80px;
      border: 2px dashed #999;
      position: relative;
      left: 80px;
      top: 80px;"
      >
        ${Story()}
      </div>`
    ),
  ],
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string,
  width: string,
  placement: string,
  referenceId: string,
  dismissible: boolean,
  arrowOffset: number,
}

const Template: Story<ArgTypes> = ({
  width,
  label,
  placement,
  referenceId,
  dismissible,
  arrowOffset,
}) => {
  return html`
    <tap-tooltip width=${width} placement=${placement} referenceId=${referenceId} dismissible=${dismissible} arrowOffset=${arrowOffset}>
      ${label}
    </tap-tooltip>
  `;
}

export const Simple = Template.bind({});
Simple.args = {
  label: 'label',
  placement: 'left',
  referenceId: "reference",
  dismissible: true,
};

export const CustomArrowOffset = Template.bind({});
CustomArrowOffset.args = {
  label: 'label',
  placement: 'top-start',
  referenceId: "reference",
  dismissible: true,
  arrowOffset: 15,
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  label: 'This is a fixed width tooltip!',
  width: '80px',
  placement: 'bottom',
  referenceId: "reference",
  dismissible: true,
};
