import { customElement } from 'lit/decorators.js';
import { ImageTwoFillIcon } from './image-two-fill';

@customElement('tap-icon-image-two-fill')
export class TapIconImageTwoFill extends ImageTwoFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-image-two-fill': TapIconImageTwoFill;
  }
}
