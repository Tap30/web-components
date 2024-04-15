import {html, TemplateResult} from "lit";
import "./index.js";

export default {
  title: "Icons",
  component: "tap-icon",
  argTypes: {
    color: {
      control: {type: "text"},
      description: "The icon color",
    },
    width: {
      control: {type: "number"},
      description: "The icon width(`px`)",
    },
    height: {
      control: {type: "number"},
      description: "The icon height(`px`)",
    },
  },
};


interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  color?: string,
  width?: number,
  height?: number,
}

const Template: Story<ArgTypes> = ({color, width, height}: ArgTypes) => html`
  <tap-icon color=${color} width=${width} height=${height}>
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M370.0918,52.146c-5.1312-5.1035-13.45-4.73-18.5638.3856-22.8748,22.8576-42.4939,50.3563-57.9047,81.18a262.8544,262.8544,0,0,0-75.3363,0,312.9512,312.9512,0,0,0-57.8235-81.1607c-5.11-5.1238-13.4326-5.5051-18.5681-.4027C83.3926,110.2814,46,198.3378,46,297.2485c0,91.875,93.9771,166.25,210,166.25,115.9375,0,210-74.375,210-166.25C466,198.3368,428.5262,110.2781,370.0918,52.146ZM146.625,330.8493c-24.3274-4.7254-44.9762-22.3129-56.875-46.7258,11.8988-24.4128,32.5476-42,56.875-46.7247Zm26.25,0V237.3988c24.2377,4.7243,44.9762,22.3119,56.875,46.7247C217.8512,308.5364,197.1127,326.1239,172.875,330.8493Zm166.25,0c-24.3274-4.7254-44.9762-22.3129-56.875-46.7258,11.8988-24.4128,32.5476-42,56.875-46.7247Zm26.25,0V237.3988c24.2377,4.7243,44.9762,22.3119,56.875,46.7247C410.3512,308.5364,389.6127,326.1239,365.375,330.8493Z"
        fill="currentColor"/>
    </svg>
  </tap-icon>
`;

export const RawIcon = Template.bind({});

RawIcon.args = {color: '#ff5722', width: 100, height: 100};

