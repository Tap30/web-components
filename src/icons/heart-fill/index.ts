import { customElement } from 'lit/decorators.js';
import { HeartFillIcon } from './heart-fill';

@customElement('tap-icon-heart-fill')
export class TapIconHeartFill extends HeartFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-heart-fill': TapIconHeartFill;
  }
}
