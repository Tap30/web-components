import { customElement } from 'lit/decorators.js';
import { ThumbUpIcon } from './thumb-up';

@customElement('tap-icon-thumb-up')
export class TapIconThumbUp extends ThumbUpIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-thumb-up': TapIconThumbUp;
  }
}
