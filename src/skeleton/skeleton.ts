import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { SkeletonAnimation, SkeletonVariant } from './types';

export class Skeleton extends LitElement {
  @property({ reflect: true }) variant?: SkeletonVariant = 'line';
  @property({ reflect: true }) animationMode?: SkeletonAnimation = 'progress';
  @property({ reflect: true }) width?: string = '100%';
  @property({ reflect: true }) height?: string = '100';

  //   get sizeStyle() {
  //     const dimensionsStyles: {
  //       width?: string;
  //       height?: string;
  //     } = {
  //       width: '',
  //       height: '',
  //     };

  //     if (this.width) {
  //       dimensionsStyles.width = this.width;
  //     }

  //     if (this.height) {
  //       dimensionsStyles.height = this.height;
  //     }

  //     console.log('sss');
  //     console.log(dimensionsStyles);

  //     return { ...dimensionsStyles };
  //   }

  render() {
    console.log(this.height);
    return html`<div
      class="skeleton"
      aria-label="Loading"
      aria-labeledby=${nothing}
      aria-describedby=${nothing}
      style="height: ${this.height}px ; width: ${this.width};"
    ></div>`;
  }
}
