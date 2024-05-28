import { html, TemplateResult } from 'lit';
import './index.ts';
import { SkeletonAnimation, SkeletonVariant } from './types';

const SkeletonVariants = ['line', 'rect', 'circle'];
const SkeletonAnimationMode = ['progress', 'none', 'pulse'];

export default {
  title: 'Skeleton',
  component: 'tap-skelton',
  argTypes: {
    variant: {
      options: SkeletonVariants,
      control: { type: 'inline-radio' },
      description: 'Skeleton Variant',
    },
    animationMode: {
      options: SkeletonAnimationMode,
      control: { type: 'inline-radio' },
      description: 'Skeleton Animation Mode',
    },
    height: {
      control: 'text',
      description: 'Skeleton Height',
    },
    width: {
      control: 'text',
      description: 'Skeleton Width',
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  variant: SkeletonVariant;
  animationMode: SkeletonAnimation;
  height: string;
  width: string;
}

const Template: Story<ArgTypes> = ({
  variant,
  animationMode,
  height,
  width,
}: ArgTypes) =>
  html`<tap-skeleton
    variant=${variant}
    animationMode=${animationMode}
    width=${width}
    height=${height}
  ></tap-skeleton> `;

export const Skeleton = Template.bind({});

Skeleton.args = {
  variant: 'line',
  animationMode: 'progress',
};
