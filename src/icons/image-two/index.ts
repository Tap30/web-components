import { customElement } from 'lit/decorators.js';
import { ImageTwoIcon } from './image-two';

@customElement('tap-icon-image-two')
export class TapIconImageTwo extends ImageTwoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-image-two': TapIconImageTwo;
  }
}
