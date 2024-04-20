import {html, TemplateResult} from "lit";
import "./index.js";
import "../tooltip";

export default {
  title: "Tooltip",
  component: "tap-tooltip",
  argTypes: {
    
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  
}

const Template: Story<ArgTypes> = ({

}) => {
  return html`
    <tap-tooltip>
    </tap-tooltip>
  `;
}

export const Simple = Template.bind({});
Simple.args = {

};
