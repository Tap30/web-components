import { customElement } from 'lit/decorators.js';
import { ThumbUpFillIcon } from './thumb-up-fill';

@customElement('tap-icon-thumb-up-fill')
export class TapIconThumbUpFill extends ThumbUpFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-thumb-up-fill': TapIconThumbUpFill;
  }
}
