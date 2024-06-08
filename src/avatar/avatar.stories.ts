import { html, TemplateResult } from 'lit';
import './index.js';
import { Meta } from '@storybook/web-components';

export default {
  title: 'Components/Avatar',
  component: 'tap-avatar',
  argTypes: {
    image: {
      description: 'image of the avatar',
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['xSmall', 'small', 'medium', 'large', 'xLarge'],
      description: 'size of the avatar',
    },
    loading: {
      control: { type: 'inline-radio' },
      options: ['eager', 'lazy'],
    },
  },
} as Meta;

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  image: string;
  size: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
  loading: 'lazy' | 'eager';
}

const Template: Story<ArgTypes> = () => html`
  <tap-avatar image="https://picsum.photos/100">
    <svg fill="#666" viewBox="0 0 24 24">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8v-.03c2.31-.22 3.43-1.59 4.34-3.41.17-.35.51-.56.9-.56h5.53c.38 0 .72.21.89.55.9 1.8 1.99 3.19 4.34 3.41v.03c0 4.42-3.59 8.01-8 8.01"
      ></path>
      <circle cx="9" cy="13" r="1.25"></circle>
      <circle cx="15" cy="13" r="1.25"></circle>
    </svg>
  </tap-avatar>
`;

export const Avatar = Template.bind({});

Avatar.args = {
  image: 'https://picsum.photos/100',
  size: 'medium',
  loading: 'eager',
};
