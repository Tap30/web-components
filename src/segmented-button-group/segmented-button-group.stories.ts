import { type Meta } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "../segmented-button";
import "./index.js";

export default {
  title: "Components/Segmented Button Group",
  component: "tap-segmented-button-group",
  argTypes: {},
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArgTypes {}

const Template: Story<ArgTypes> = () => html`
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
