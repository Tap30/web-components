import { customElement } from 'lit/decorators.js';
import { ImageFillIcon } from './image-fill';

@customElement('tap-icon-image-fill')
export class TapIconImageFill extends ImageFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-image-fill': TapIconImageFill;
  }
}
