import { customElement } from 'lit/decorators.js';
import { ThumbDownIcon } from './thumb-down';

@customElement('tap-icon-thumb-down')
export class TapIconThumbDown extends ThumbDownIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-thumb-down': TapIconThumbDown;
  }
}
