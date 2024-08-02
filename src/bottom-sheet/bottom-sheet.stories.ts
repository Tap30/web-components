import { html, TemplateResult } from 'lit';
import './index.js';
import '../tooltip';

export default {
  title: 'Bottom Sheet',
  component: 'tap-bottom-sheet',
  parameters: {
    layout: 'fullscreen',
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  open?: boolean;
  disappear?: boolean;
  isDismissible?: boolean;
  title?: string;
  isExpanded?: boolean;
  showGrabber?: boolean;
}

const Template: Story<ArgTypes> = ({ title, open }) => {
  return html` <tap-bottom-sheet title=${title} open=${open}>
    <div slot="bottom-sheet-body" style="">This is body!</div>
  </tap-bottom-sheet>`;
};

export const Simple = Template.bind({});
Simple.args = {
  title: 'عنوان',
  open: true,
};
