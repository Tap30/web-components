import { customElement } from 'lit/decorators.js';
import { PinCrossFillIcon } from './pin-cross-fill';

@customElement('tap-icon-pin-cross-fill')
export class TapIconPinCrossFill extends PinCrossFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin-cross-fill': TapIconPinCrossFill;
  }
}
