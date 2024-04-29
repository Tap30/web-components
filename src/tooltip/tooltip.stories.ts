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
      style="width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      position: relative;"
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
}

const Template: Story<ArgTypes> = ({
  width,
  label,
  pointer,
  pointerAlignment,
}) => {
  return html`
    <tap-tooltip width=${width} pointer=${pointer} pointerAlignment=${pointerAlignment} >
      ${label}
    </tap-tooltip>
  `;
}

export const Simple = Template.bind({});
Simple.args = {
  label: 'عنوان',
  pointer: 'right',
  pointerAlignment: 'start'
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  label: 'عنوان',
  width: '80px',
  pointer: 'left',
  pointerAlignment: 'start'
};
