import { html, TemplateResult } from 'lit';
import './index.js';
import '../badge';
import '../button';

export default {
  title: 'Badge',
  component: 'tap-badge-wrapper',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = ({}: ArgTypes) => html`
  <tap-badge-wrapper>
    <tap-badge value="‍۱۰" slot="badge" variant="info"></tap-badge>
    <tap-button>عنوان دکمه</tap-button>
  </tap-badge-wrapper>
`;

export const BadgeWrapper = Template.bind({});

BadgeWrapper.args = {};
