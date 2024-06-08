import { customElement } from 'lit/decorators.js';
import { GiftIcon } from './gift';

@customElement('tap-icon-gift')
export class TapIconGift extends GiftIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-gift': TapIconGift;
  }
}
