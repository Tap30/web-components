import { html, TemplateResult } from 'lit';
import '../segmented-button';
import './index.js';

export default {
  title: 'Segmented Button Group',
  component: 'tap-segmented-button-group',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-segmented-button-group>
    <tap-segmented-button>عنوان</tap-segmented-button>
    <tap-segmented-button>عنوان</tap-segmented-button>
    <tap-segmented-button>عنوان</tap-segmented-button>
    <tap-segmented-button>عنوان</tap-segmented-button>
    <tap-segmented-button>عنوان</tap-segmented-button>
  </tap-segmented-button-group>
`;

export const SegmentedButtonGroup = Template.bind({});

SegmentedButtonGroup.args = {};
