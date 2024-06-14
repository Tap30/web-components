import {html, TemplateResult} from 'lit';
import './index.js';
import {Meta} from '@storybook/web-components';

import "../avatar";
import "../badge";
import "../badge-wrapper";
import "../banner";
import "../bottom-navigation";
import "../bottom-navigation-item";
import "../button";
import "../checkbox";
import "../divider";
import "../icon-button";
import "../input";
import "../modal";
import "../pinwheel";
import "../pinwheel-group";
import "../progress-indicator";
import "../radio";
import "../radio-group";
import "../row";
import "../segmented-button";
import "../segmented-button-group";
import "../skeleton";
import "../spinner";
import "../step-indicator";
import "../stepper";
import "../toast";
import "../tooltip";
import "../button";
import "../../styles/theme.css";

export default {
  title: 'custom-element-manifest-viewer',
  component: 'custom-element-manifest-viewer',
  argTypes: {
    src: {
      description: 'the source of the custom element manifest',
    },
    'tagName': {
      description: 'target tag name',
      control: {type: 'select'},
      options: [
        "tap-avatar",
        "tap-badge",
        "tap-badge-wrapper",
        "tap-banner",
        "tap-base-button",
        "tap-bottom-navigation",
        "tap-bottom-navigation-item",
        "tap-base-button",
        "tap-button",
        "tap-base-button",
        "tap-checkbox",
        "tap-divider",
        "tap-icon-button",
        "tap-input",
        "tap-modal",
        "tap-notice",
        "tap-pinwheel",
        "tap-pinwheel-group",
        "tap-progress-indicator",
        "tap-radio",
        "tap-radio-group",
        "tap-row",
        "tap-segmented-button",
        "tap-segmented-button-group",
        "tap-skeleton",
        "tap-spinner",
        "tap-step-indicator",
        "tap-stepper",
        "tap-text-field",
        "tap-textarea",
        "tap-toast",
        "tap-tooltip",
        "tap-button",
      ]
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  src: string;
  tagName: string;
}

const Template: Story<ArgTypes> = ({tagName}) => html`
  <custom-element-manifest-viewer tag-name=${tagName} src="../../dist/custom-elements.json">
  </custom-element-manifest-viewer>



`;


export const Default = Template.bind({});

Default.args = {
  src: 'https://picsum.photos/100',
  tagName: 'tap-avatar'
};
