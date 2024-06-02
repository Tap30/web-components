import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { SkeletonAnimation, SkeletonVariant } from './types';

export class Skeleton extends LitElement {
  @property({ reflect: true }) variant?: SkeletonVariant = 'line';
  @property({ reflect: true, attribute: 'animation-mode' })
  animationMode?: SkeletonAnimation = 'progress';
  @property({ reflect: true }) width?: string = '100%';
  @property({ reflect: true }) height?: string = '20px';

  render() {
    return html`<div
      part="skeleton"
      class="skeleton"
      aria-label="Loading"
      aria-labeledby=${nothing}
      aria-describedby=${nothing}
      style="height: ${this.height}; width: ${this.width};"
    ></div>`;
  }
}
