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
      left: 100px;
      top: 100px;"
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
  pointer: string,
  pointerAlignment?: string,
  referenceId: string,
  dismissible: boolean,
  arrowOffset: number,
}

const Template: Story<ArgTypes> = ({
  width,
  label,
  pointer,
  pointerAlignment,
  referenceId,
  dismissible,
  arrowOffset,
}) => {
  return html`
    <tap-tooltip width=${width} pointer=${pointer} pointerAlignment=${pointerAlignment} referenceId=${referenceId} dismissible=${dismissible} arrowOffset=${arrowOffset}>
      ${label}
    </tap-tooltip>
  `;
}

export const Simple = Template.bind({});
Simple.args = {
  label: 'label',
  pointer: 'left',
  referenceId: "reference",
  dismissible: true,
};

export const CustomArrowOffset = Template.bind({});
CustomArrowOffset.args = {
  label: 'label',
  pointer: 'top-start',
  referenceId: "reference",
  dismissible: true,
  arrowOffset: 15,
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  label: 'This is a fixed width tooltip!',
  width: '80px',
  pointer: 'bottom',
  referenceId: "reference",
  dismissible: true,
};
