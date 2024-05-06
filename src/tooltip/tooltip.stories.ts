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
        style="width: 80px;
        height: 80px;
        border: 2px dashed #999;
        position: relative;
        left: 80px;
        top: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--tap-sys-font-family);"
        >
          <span style="color: #999">reference</span>
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
  dismissible: boolean,
  arrowOffset: string,
}

const Template: Story<ArgTypes> = ({
  width,
  label,
  placement,
  dismissible,
  arrowOffset,
}) => {
  return html`
    <tap-tooltip width=${width} placement=${placement} dismissible=${dismissible} arrowOffset=${arrowOffset}>
      ${label}
    </tap-tooltip>
  `;
}

export const Simple = Template.bind({});
Simple.args = {
  label: 'label',
  placement: 'left',
  dismissible: true,
};

export const CustomArrowOffset = Template.bind({});
CustomArrowOffset.args = {
  label: 'label',
  placement: 'top-start',
  dismissible: true,
  arrowOffset: '15px',
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  label: 'This is a fixed width tooltip!',
  placement: 'bottom',
  dismissible: true,
  width: '80px',
};
