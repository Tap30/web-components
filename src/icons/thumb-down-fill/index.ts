import { customElement } from 'lit/decorators.js';
import { ThumbDownFillIcon } from './thumb-down-fill';

@customElement('tap-icon-thumb-down-fill')
export class TapIconThumbDownFill extends ThumbDownFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-thumb-down-fill': TapIconThumbDownFill;
  }
}
