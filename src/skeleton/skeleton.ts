import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { SkeletonAnimation, SkeletonVariant } from './types';

export class Skeleton extends LitElement {
  @property({ reflect: true }) variant?: SkeletonVariant = 'line';
  @property({ reflect: true }) animationMode?: SkeletonAnimation = 'progress';
  @property({ reflect: true }) width?: string = '100%';
  @property({ reflect: true }) height?: string = '100';

  render() {
    return html`<div
      class="skeleton"
      aria-label="Loading"
      aria-labeledby=${nothing}
      aria-describedby=${nothing}
      style="height: ${this.height}px; width: ${this.width};"
    ></div>`;
  }
}
