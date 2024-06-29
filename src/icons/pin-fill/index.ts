import { customElement } from 'lit/decorators.js';
import { PinFillIcon } from './pin-fill';

@customElement('tap-icon-pin-fill')
export class TapIconPinFill extends PinFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin-fill': TapIconPinFill;
  }
}
